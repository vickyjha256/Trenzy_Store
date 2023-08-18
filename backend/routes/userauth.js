const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // This is for deployment.
const JWT_SECRET_KEY = "Shoestoreapp_Authorization"; // This is for testing on local host.

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
            return res.status(400).json({error: "Incorrect current password."});
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


module.exports = router;