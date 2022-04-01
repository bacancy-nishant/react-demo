const dbConn = require('../config/db');
const fs = require("fs");
const rootDir = require("../utils/path");
const path = require("path");
const p = path.join(rootDir, "data", "cart.json");

const getCartFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    let cart = { products: [], totalPrice: 0 };
    if (err) {
      return cb(cart);
    }
    return cb(JSON.parse(fileContent));
  });
};

class Cart {
  static addProduct(id, price) {
    dbConn.query("SELECT * FROM carts WHERE id=?", id, (err, res) => {
      if (err) console.log(err);
      if (res.length > 0) {
        let product = res[0];
        product.qty++;
        dbConn.query("UPDATE carts SET qty=? where product_id=?", [product.qty, id], (err, res) => {
          if (err) throw err;
          console.log(res);
        });
      } else {
        dbConn.query("INSERT INTO carts SET product_id=?,qty=?,unit_price=?", [id, 1, price], (err, res) => {
          if (err) throw err;
          console.log(res);
        });
      }
    });
  }

  static getCart(cb) {
    dbConn.query("SELECT * FROM carts", (err, res) => {
      if (err) cb(err, null);
      cb(null, res);
    });
  }

  static delete(id, price) {
    dbConn.query("DELETE FROM carts WHERE id=?", id, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  }
}

module.exports = Cart;
