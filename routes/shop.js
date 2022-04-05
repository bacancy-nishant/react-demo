const path = require("path");
const express = require("express");

// const rootDir = require("../utils/path");
const productController = require("../controllers/products");
const apiController = require("../controllers/api/products")

const router = express.Router();

router.get('/',productController.getIndex);

router.get('/products/:id',productController.getProduct);

router.get('/products',productController.getProducts);

router.get('/cart',productController.getCart);

router.post('/add-to-cart',productController.addToCart);

router.post('/remove-cart-item',productController.removeCartItem);

router.get('/checkout',productController.getCheckout);

router.get('/orders',productController.getOrders);
//API
router.get('/api/product-list',apiController.getProducts);
router.get('/api/product/:id',apiController.getProduct);



module.exports = router;