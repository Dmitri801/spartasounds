const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const categories = require("./routes/api/categories");
const genres = require("./routes/api/genres");
const audiotracks = require("./routes/api/audiotracks");
const images = require("./routes/api/images");
const test = require("./routes/api/test");
const PORT = process.env.PORT || 8080;
const app = express();

// Mongoose/MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));

// =================================== //
// ============= Routes ============== //
// =================================== //

app.use("/", audiotracks);
app.use("/", images);
app.use("/", test);
app.use("/", users);
app.use("/", products);
app.use("/", categories);
app.use("/", genres);

// DEFAULT
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`SERVER Running On Port: ${PORT}`);
});
