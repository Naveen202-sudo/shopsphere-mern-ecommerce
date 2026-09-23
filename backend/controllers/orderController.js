const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {

    const order = await Order.create({
        ...req.body,
        user: req.user
    });

    res.status(201).json({
        success: true,
        order
    });

};

exports.getOrders = async (req, res) => {

    const orders = await Order.find();

    res.json({
        success: true,
        orders
    });

};

exports.getSingleOrder = async (req, res) => {

    const order = await Order.findById(req.params.id);

    res.json({
        success: true,
        order
    });

};

exports.updateOrder = async (req, res) => {

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        order
    });

};

exports.deleteOrder = async (req, res) => {

    const order = await Order.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Order deleted successfully"
    });

};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({
        user: req.user
    }).populate("product");

    res.json({
        success: true,
        orders
    });
};;