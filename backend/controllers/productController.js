const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        }
        : {};

    const price = req.query.price
        ? {
            price: {
                $lte: Number(req.query.price.lte)
            }
        }
        : {};

        const category = req.query.category
    ? {
        category: req.query.category
    }
    : {};

    const sort = req.query.sort
    ? req.query.sort
    : "asc";

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const totalProducts = await Product.countDocuments({
    ...keyword,
    ...price,
    ...category
});

const totalPages = Math.ceil(totalProducts / limit);


   const products = await Product.find({
    ...keyword,
    ...price,
    ...category
})
.sort({
    price: sort === "desc" ? -1 : 1
})
.skip((page - 1) * limit)
.limit(limit);

    res.json({
        success: true,
        products
    });
};

exports.createProduct = async(req , res) =>{
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })

}

exports.getSingleProduct = async (req, res) => {

    const product = await Product.findById(req.params.id);

    res.json({
        success: true,
        product
    });
};

exports.updateProduct = async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        product
    });
};

exports.deleteProduct = async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Product deleted successfully"
    });
};

