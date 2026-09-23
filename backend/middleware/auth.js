const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {

    console.log("AUTH MIDDLEWARE REACHED");
    console.log("Cookies:", req.cookies);

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login to access this resource"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
};