const express = require("express");

const {
    getProducts,createProduct,getSingleProduct,updateProduct,deleteProduct
} = require("../controllers/productController");

const {
    isAuthenticatedUser
} = require("../middleware/auth");

const {
    isAdmin
} = require("../middleware/isAdmin");

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", isAuthenticatedUser, isAdmin, createProduct);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", isAuthenticatedUser, isAdmin, updateProduct);
router.delete(
    "/product/:id",
    isAuthenticatedUser,
    isAdmin,
    deleteProduct
);

module.exports = router;