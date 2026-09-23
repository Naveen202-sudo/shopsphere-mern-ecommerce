const express = require("express");

const {
    createReview,
    getProductReviews,
    deleteReview,
    updateReview
   
} = require("../controllers/reviewController");

const {
    isAuthenticatedUser
} = require("../middleware/auth");

const router = express.Router();

router.post(
    "/review",
    isAuthenticatedUser,
    createReview
);

router.get(
    "/reviews/:id",
    getProductReviews
);

router.delete(
    "/review/:id",
    isAuthenticatedUser,
    deleteReview
);

router.put(
    "/review/:id",
    isAuthenticatedUser,
    updateReview
);

module.exports = router;