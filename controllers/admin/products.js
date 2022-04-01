const Product = require("../../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    editing: false,
  });
};

const getEditProduct = (req, res, next) => {
  //for query params
  // const { id } = req.query;
  const { id } = req.params;
  Product.getById(id, (err, product) => {
    if (err) throw err;
    res.render("admin/edit-product", {
      product,
      pageTitle: "Edit Product",
      editing: true,
    });
  });
};

const postAddProduct = (req, res, next) => {
  console.log(req.body);
  const { title, description, price } = req.body;
  const product = new Product(null, title, description, price);
  product.save();
  res.redirect("/admin/products");
};

const postEditProduct = (req, res, next) => {
  console.log(req.body);
  const { id, title, description, price } = req.body;
  const product = new Product(id, title, description, price);
  product.save();
  res.redirect("/admin/products");
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.delete(id);
  res.redirect("/admin/products");
};

const getProducts = (req, res, next) => {
  Product.getAll((err, products) => {
    console.log(products);
    if (err) throw err;
    res.render("admin/product-list", { products, pageTitle: "Admin Products" });
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
