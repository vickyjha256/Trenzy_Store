var jwt = require('jsonwebtoken');
// const JWT_PRIAD_SECRET_KEY = process.env.JWT_PRIAD_SECRET_KEY; // This is for deployment.
const JWT_PRIAD_SECRET_KEY = "Shoestoreapp_PrivateAdminAuthorization"; // This is for testing on localhost.

const fetchadmin = (req, res, next) => { // Here, (next) is callback function.
    // Get the admin from the jwt token and add id to req object.
    const token = req.header('admintoken');
    if (!token) {
        res.status(401).send({ error: "Access denied: Unauthorized Access !!" });
    }
    try {
        const data = jwt.verify(token, JWT_PRIAD_SECRET_KEY);
        req.admin = data;
        // console.log("Data: " + data);
        // console.log("Req.admin = " + req.admin); // This is for testing only.
        next(); // Here, we call the next function for calling the next async(req, res) function of routes's endpoint.
    } catch (error) {
        res.status(401).send({ error: "Access denied: Unauthorized Access !!" });
    }
}

module.exports = fetchadmin;