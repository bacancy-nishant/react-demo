const express = require("express");

// const rootDir = require("../utils/path");
const productController = require('../controllers/admin/products');

const router = express.Router();

router.get('/add-product',productController.getAddProduct);

router.get('/edit-product/:id',productController.getEditProduct);

router.get('/products',productController.getProducts);

router.post('/add-product',productController.postAddProduct);

router.post('/edit-product',productController.postEditProduct);

router.post('/delete-product',productController.postDeleteProduct);

module.exports = router;
