const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        user
    });
};


exports.loginUser = async (req, res) => {

    console.log("LOGIN ROUTE REACHED");
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Email:", email);
console.log("Password matched:", isPasswordMatched);

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getUserProfile = async (req, res) => {

    const user = await User.findById(req.user);

    res.json({
        success: true,
        user
    });
};

exports.logoutUser = async (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.json({
        success: true,
        message: "Logged out successfully"
    });
};

exports.logout = (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.json({
        success: true,
        message: "Logged out successfully"
    });
};