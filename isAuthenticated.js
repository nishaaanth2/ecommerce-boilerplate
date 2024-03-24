const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
    // Check if the Authorization header is present in the request
    if (!req.headers["authorization"]) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    // Split the Authorization header to extract the token
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            req.user = user;
            next();
        }
    });
};
