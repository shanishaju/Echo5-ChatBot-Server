middleware/verifyToken.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
const token = req.headers["authorization"];
if (!token)
return res.status(403).json({ message: "Token is required" });

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.siteID = decoded.siteID;
next();
} catch (err) {
return res.status(401).json({ message: "Invalid token" });
}
};

module.exports = verifyToken;