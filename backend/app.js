console.log("THIS IS MY APP.JS");
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/orderRoutes")
const {errorHandler} = require("./middleware/error")
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config({
    path: path.join(__dirname, "config", "config.env")
});

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cookieParser());

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes")

console.log("USER ROUTES LOADED");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);

app.get("/test", (req, res) => {
    console.log("TEST ROUTE REACHED");

    res.json({
        success: true,
        message: "Test route working"
    });
});

app.get("/", (req , res)=>{
     res.json({
        success: true,
        message: "ShopSphere API is working!"
    });
})

app.use(errorHandler);
module.exports = app;