require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/admin/error");
const ADMIN = "/admin";

app.set("view engine", "ejs");
app.set("views", "views");

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ADMIN, adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log("started"));
