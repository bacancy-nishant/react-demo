const Product = require("../../models/product");

const getProducts = (req, res, next) => {
    Product.getAll((err, products) => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true, data: products });
    });
    // res.sendFile(path.join(rootDir,'views','shop.html')); <-- static html render.    
}

const getProduct = (req, res, next) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true, data: product });
    });
}

module.exports = {
    getProducts,
    getProduct
}