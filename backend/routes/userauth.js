const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
const otpgenerator = require('otp-generator');


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // This is for deployment.
// const JWT_SECRET_KEY = "Shoestoreapp_Authorization"; // This is for testing on local host.

// ROUTE 1:--> Create a user using: POST "/api/userauth/registerUser". No login required.
router.post('/registerUser', [
    body('name', 'Please Enter a valid name !!').isLength({ min: 3 }),
    body('email', 'Please Enter a valid Email !!').isEmail().normalizeEmail().toLowerCase(),
    body('password', 'Password must contain atleast one uppercase, one lowercase, one number and one special character.')
        .isLength({ min: 5 }).isStrongPassword()
], async (req, res) => {
    let success = false;

    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // It returns error 400 bad request if error occured.
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Below code check whether the user with this email exists already.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry, user already exists with this email !!' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassWord = await bcrypt.hash(req.body.password, salt);

        user = await User.create({ // It creates new user in the database.
            name: req.body.name,
            email: req.body.email,
            password: secPassWord,
            contact: "",
            address: ""
        });

        // Below code generates the authtoken for verifying user.
        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET_KEY);

        success = true;
        res.json({ success, authtoken });
        // res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Some error occurred.");
    }
});

// ROUTE 2:--> Authenticate a user using: POST "/api/userauth/login". No login required.
router.post('/login', [
    body('email', 'Please Enter a valid Email !!').isEmail().normalizeEmail().toLowerCase(),
    body('password', 'Password field cannot be empty.').exists(),
], async (req, res) => {
    let success = false;

    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // It returns error 400 bad request if error occured.
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Below code check whether the user with this email exists or not.
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please enter correct email and password.' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password) // It compares the entered password with database's password.
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please enter correct email and password.' });
        }

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET_KEY);

        success = true;
        res.json({ success, authtoken });
        // res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 3:--> Get Logged in user details using: POST "/api/userauth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // let userId = req.user.id;
        // userId = req.user.id;
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 4:--> Change Password using: POST "/api/userauth/changepassword". Login required.
router.post('/changepassword', fetchuser, [
    body('currentpassword', 'Password field cannot be empty.').exists(),
    body('newpassword', 'Password must contain atleast one uppercase, one lowercase, one number and one special character.').exists().isLength({ min: 5 }).isStrongPassword(),
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // It returns error 400 bad request if error occured.
        return res.status(400).json({ errors: errors.array() });
    }

    const { currentpassword, newpassword } = req.body; // Destructured Passwords from body.
    try {
        const user = await User.findById(req.user.id);

        const passwordMatching = await bcrypt.compare(currentpassword, user.password);
        if (!passwordMatching) {
            success = false;
            return res.status(400).json({ error: "Incorrect current password." });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedNewPassword = await bcrypt.hash(newpassword, salt);

        const updatePassword = await user.updateOne({ password: encryptedNewPassword, }); // It updates the password field of user.

        // console.log("Current Password: " + currentpassword, "\nNew Password: " +  newpassword);
        success = true;
        res.json({ success });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 5:--> Forgot Password using: POST "/api/userauth/forgotpassword". No Login required.
let forgottedUser; // This is created globally so that it can be accessible in another routes.
let generatedOTP; // This is created globally so that it can be accessible in another routes.
router.post("/forgotpassword", [
    body('email', "Please enter a valid email address.").isEmail().normalizeEmail().toLowerCase(),
], async (req, res) => {
    let sent = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // It returns error 400 bad request if error occured.
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
        // const user = await User.find({email: req.body.email});
        forgottedUser = await User.findOne({ email });

        if (!forgottedUser) {
            sent = false;
            return res.status(400).json({ error: "Please enter correct email !!" });
        }


        generatedOTP = otpgenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const userName = forgottedUser.name;

        // --------------------- Node Mailer - Code ----------------------
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'trenzy.verify@gmail.com',
                pass: process.env.APP_PASS_FOR_MAIL
            }
        });


        // Prepare the email data
        const mailOptions = {
            from: 'trenzy.verify@gmail.com',
            to: `${email}`, // User's email
            subject: 'Your OTP Code',
            html: `<h3> Hello, ${userName}</h3>Please use the 6 digit OTP below to reset your password:<br><b>${generatedOTP}</b>
            <br>If you didn't request this, you can ignore this email.<h4>Thanks<br>Trenzy</h4>`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
            } else {
                console.log('OTP sent:', info.response);
            }
        });

        sent = true;
        console.log("All is well");
        res.json({ sent });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 6:--> OTP verify using: POST "/api/userauth/otpverify". No Login required.
let otp;
router.post('/otpverify', [
    body('otp', "OTP is invalid.").exists().isInt().isLength({ min: 6, max: 6 }),
], async (req, res) => {
    let verified = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        otp = req.body.otp;
        if (otp != generatedOTP) {
            verified = false;
            return res.status(404).json({ error: "Please enter a valid OTP." });
        }

        verified = true;
        res.json({ verified });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

});

// ROUTE 7:--> Resetting Password using: POST "/api/userauth/resetpassword". No Login required.
router.post('/resetpassword', [
    body('newpassword', "Password must contain atleast one uppercase, one lowercase, one number and one special character and minimum of 5 characters atleast.").exists().isStrongPassword().isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (!forgottedUser || otp != generatedOTP) {
            success = false;
            return res.status(401).json({ error: "Unauthorized action performed 😠😠 !!" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedNewPassword = await bcrypt.hash(req.body.newpassword, salt);

        const resetted = await forgottedUser.updateOne({ password: encryptedNewPassword });

        success = true;
        res.json({ success });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

});

module.exports = router;