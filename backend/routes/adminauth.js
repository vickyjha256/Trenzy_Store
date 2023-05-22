const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');

const JWT_PRIAD_SECRET_KEY = "Shoestoreapp_PrivateAdminAuthorization"; // This is for testing only.

// ROUTE 1:--> Create a admin using: POST "/api/adminauth/createadmin". No login required.
router.post(
    '/createadmin', [
    body('name', "Please enter a valid name !!").isString().isLength({ min: 3 }),
    body('email', "Please enter a valid email !!").isEmail().normalizeEmail().toLowerCase(),
    body('password', "Password must contain atleast one uppercase, one lowercase, one number and one special character.").isLength({ min: 5 }).isStrongPassword()
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Below code will check whether the admin is already exists or not.
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            res.status(400).json({ success, error: "Sorry, one admin already exists with this email !!" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassWord = await bcrypt.hash(req.body.password, salt);

        admin = await Admin.create({ // It creates new Admin in the database.
            name: req.body.name,
            email: req.body.email,
            password: secPassWord,
        });

        // Below code generates the admintoken for verifying admin.
        const data = {
            id: admin.id,
        }
        // const admintoken = jwt.sign(data, process.env.JWT_PRIAD_SECRET_KEY); // This is for deployment.
        const admintoken = jwt.sign(data, JWT_PRIAD_SECRET_KEY); // This is for testing on localhost.

        success = true;
        res.json({ success, admintoken }); // This is for testing only.
        // res.json(admin); // This is for testing only.
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured.");
    }
},
);

// ROUTE 2:--> Authenticate a admin using: POST "/api/adminauth/login". No login required.
router.post(
    '/adminlogin', [
    body('email', "Please enter a valid email !!").isEmail().normalizeEmail().toLowerCase(),
    body('password', "Password field cannot be empty !!").exists()
], async (req, res) => {
    let success = false;

    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Below code will check the user exists or not.
        let admin = await Admin.findOne({ email });
        if (!admin) {
            success = false;
            res.status(400).send("Please enter correct email and password.");
        }

        const passwordCompare = await bcrypt.compare(password, admin.password) // It compares the entered password with database's password.
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: 'Please enter correct email and password.' });
        }

        // Below code generates the admintoken for verifying admin.
        const data = {
            id: admin.id,
        }
        // const admintoken = jwt.sign(data, process.env.JWT_PRIAD_SECRET_KEY); // This is for deployment.
        const admintoken = jwt.sign(data, JWT_PRIAD_SECRET_KEY); // This is for testimg on localhost.

        success = true;
        res.json({ success, admintoken, admin });
        // res.json(admin); // This is for testing only.
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured.");
    }
},
);

// ROUTE 3:--> Get Logged in admin details using: POST "/api/userauth/getadmin". Login required.
router.post('/getadmin', fetchadmin, async (req, res) => {
    try {
        let adminId = req.admin.id;
        // userId = req.user.id;
        const admin = await Admin.findById(adminId).select("-password");
        res.send(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;