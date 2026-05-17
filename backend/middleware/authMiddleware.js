const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Error occured: No login token!');
        return res.status(401).json({
            message: "No token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;

        next();

    } catch {
        console.log('Error occured: Invalid login token!');
        res.status(401).json({
            message: "Invalid token"
        });

    }

};