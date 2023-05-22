var jwt = require('jsonwebtoken');
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // This is for deployment.
const JWT_SECRET_KEY = "Shoestoreapp_Authorization"; // This is for testing on local host.
const fetchuser = (req, res, next) => { // 'next' is callback function.
    // Get the user from the jwt token and add id to req object.
    const usertoken = req.header('authtoken');
    if (!usertoken) {
        res.status(401).send({ error: "Access denied: Unauthorized Access !!" });
    }
    try {
        const data = jwt.verify(usertoken, JWT_SECRET_KEY);
        req.user = data;
        // console.log(data);
        // console.log(req.user); // This is for testing only.
        next(); // Here, we call the next function for calling the next async(req, res) function of routes's endpoint.
    } catch (error) {
        res.status(401).send({ error: "Access denied: Unauthorized Access !!" });
    }
}

module.exports = fetchuser;