const dbConn = require('../config/db');
const fs = require("fs");
const rootDir = require("../utils/path");
const path = require("path");
const Cart = require("./cart");
const p = path.join(rootDir, "data", "products.json");

const getProductFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

class Product {
  constructor(id, title, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
      dbConn.query("UPDATE products SET title=?, description=?, price=? WHERE id=?", [this.title, this.description, this.price, this.id], (err, res) => {
        if (err) throw err;
        console.log(res);
      });
    } else {
      dbConn.query('INSERT INTO products SET ? ', this, (err, res) => {
        if (err) throw err;
        console.log(res);
      });
    }
  }

  static getById(id, cb) {
    dbConn.query("SELECT * FROM products WHERE id=?", id, (err, res) => {
      if (err) cb(err, null);
      cb(null, res[0]);
    });
  }

  static getAll(cb) {
    dbConn.query("SELECT * FROM products", (err, res) => {
      if (err) cb(err, null);
      cb(null, res);
    });
  }

  static delete(id) {
    getProductFile((products) => {
      const index = products.findIndex((p) => p.id === id);
      const product = products[index];
      products.splice(index, 1);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (!err) {
          Cart.delete(id, product.price);
        }
        console.log(err);
      });
    });
  }
}

module.exports = Product;
