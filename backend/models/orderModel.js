
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Processing",
            "Shipped",
            "Delivered"
        ],
        default: "Processing"
    }

});

module.exports = mongoose.model("Order", orderSchema);
