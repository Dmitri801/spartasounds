const express = require("express");
const router = express.Router();
// Middleware
const { auth } = require("../../middleware/auth");
const { admin } = require("../../middleware/admin");
// Models
const { Product } = require("../../models/Product");

// ============= PRODUCTS ============== //

// SHOP PAGE
// @route POST api/products/shop
// @description Get Products and Filter based on Data
// @access Public
router.post("/api/products/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = parseInt(req.body.skip);
  let findArguments = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArguments[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArguments[key] = req.body.filters[key];
      }
    }
  }
  Product.find(findArguments)
    .populate("genre")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({
        size: articles.length,
        articles: articles
      })
    })
  res.status(200);
});

// BY ARRIVAL
// @route       GET api/products/allproducts?sortBy=createdAt&order=desc&limit=4 // BY SELL
// /allproducts?sortBy=sold&order=desc&limit=4
// @description Get products by their arrival time
// @access      Public
router.get("/api/products/allproducts", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("genre")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

// @route       GET api/product/product_id?id=45345435345345345,34543543543&type=array
// @description Get product by ID
// @access      Public

router.get("/api/products/product_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({
    _id: { $in: items }
  })
    .populate("genre")
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

// @route       POST api/products/new
// @description Create A New Kit
// @access      Admin

router.post("/api/products/new", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, product: doc });
  });
});

module.exports = router;
