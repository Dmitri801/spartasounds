const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const categories = require("./routes/api/categories");
const genres = require("./routes/api/genres");
const PORT = process.env.PORT || 8080;
const app = express();

// Mongoose/MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// =================================== //
// ============= Routes ============== //
// =================================== //

app.use("/", users);
app.use("/", products);
app.use("/", categories);
app.use("/", genres);

app.listen(PORT, () => {
  console.log(`SERVER Running On Port: ${PORT}`);
});
