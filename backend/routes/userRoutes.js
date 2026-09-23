const express = require("express");

const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
} = require("../controllers/userController");

const {
    isAuthenticatedUser
} = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);

router.get("/logintest", (req, res) => {
    console.log("LOGIN TEST REACHED");

    res.json({
        success: true,
        message: "Login route working"
    });
});

router.post("/login", loginUser);

router.get("/me", isAuthenticatedUser, getUserProfile);

router.get("/logout", logoutUser);

module.exports = router;