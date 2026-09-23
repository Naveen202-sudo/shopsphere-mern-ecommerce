const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {

    const existingReview = await Review.findOne({
        product: req.body.product,
        user: req.user
    });

    if (existingReview) {
        return res.status(400).json({
            success: false,
            message: "You have already reviewed this product"
        });
    }

    const review = await Review.create({
        ...req.body,
        user: req.user
    });

    res.status(201).json({
        success: true,
        review
    });
};

exports.getProductReviews = async (req, res) => {

    const reviews = await Review.find({
        product: req.params.id
    });

    res.json({
        success: true,
        reviews
    });
};

exports.deleteReview = async (req, res) => {

    await Review.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Review deleted successfully"
    });
};

exports.updateReview = async (req, res) => {

    const review = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        review
    });
};