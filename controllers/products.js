const Cart = require("../models/cart");
const Product = require("../models/product");

const getProducts = (req, res, next) => {
    Product.getAll((err, products) => {
        console.log(products);
        if (err) throw err;
        res.render('shop/product-list', { products, pageTitle: 'Products' });
    });
    // res.sendFile(path.join(rootDir,'views','shop.html')); <-- static html render.    
}

const getProduct = (req, res, next) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) throw err;
        res.render('shop/product-detail', { product, pageTitle: 'Products' });
    });
}

const getCart = (req, res, next) => {
    Cart.getCart((err, cart) => {
        if (err) throw err;
        Product.getAll((err, products) => {
            if (err) throw err;
            const cartData = { products: [], totalPrice: 0 };
            cart.forEach(product => {
                const val = products.find(p => p.id === product.product_id);
                let thisTotal = val.price * product.qty;
                cartData.products.push({ ...val, ...product });
                cartData.totalPrice += thisTotal;
            });
            console.log('cartData', cartData);
            res.render('shop/cart', { cart: cartData, pageTitle: 'Shopping Cart' });
        });
    });
}

const addToCart = (req, res, next) => {
    const { id } = req.body;
    Product.getById(id, (err, product) => {
        Cart.addProduct(id, product.price);
    });
    res.redirect('/cart');
}

const removeCartItem = (req, res, next) => {
    const { id } = req.body;
    Product.getById(id, (err, product) => {
        Cart.delete(id, product.price);
    });
    res.redirect('/cart');
}

const getCheckout = (req, res, next) => {
    Product.getAll(products => {
        res.render('shop/checkout', { products, pageTitle: 'Checkout' });
    });
}

const getIndex = (req, res, next) => {
    Product.getAll((err, products) => {
        if (err) throw err;
        res.render('shop/index', { products, pageTitle: 'Shop' });
    });
}

const getOrders = (req, res, next) => {
    Product.getAll((err, products) => {
        if (err) throw err;
        res.render('shop/orders', { products, pageTitle: 'Orders' });
    });
}

module.exports = {
    getProducts,
    getCart,
    getIndex,
    getCheckout,
    getOrders,
    getProduct,
    addToCart,
    removeCartItem
}