
const express = require("express");

const {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getMyOrders
} = require("../controllers/orderController");

const {
    isAuthenticatedUser
} = require("../middleware/auth");

const {
    isAdmin
} = require("../middleware/isAdmin");

const router = express.Router();

router.post(
    "/order",
    isAuthenticatedUser,
    createOrder
);

router.get(
    "/orders",
    isAuthenticatedUser,
    isAdmin,
    getOrders
);

router.get(
    "/order/:id",
    getSingleOrder
);


router.put(
    "/order/:id",
    isAuthenticatedUser,
    isAdmin,
    updateOrder
);

router.delete(
    "/order/:id",
    isAuthenticatedUser,
    deleteOrder
);

router.get(
    "/myorders",
    isAuthenticatedUser,
    getMyOrders
);

module.exports = router;
