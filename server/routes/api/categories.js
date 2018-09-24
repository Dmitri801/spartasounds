const express = require('express');
const router = express.Router();
// Middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
// Models
const { Category} = require("../../models/Category");

// ============= CATEGORY ============== //     
// @route       POST api/products/category
// @description Create A New Category 
// @access      Admin
router.post("/api/products/category", auth, admin, (req, res) => {
    const category = new Category(req.body);
  
    category.save((err, doc) => {
      if(err) return res.json({ success: false, err })
         res.status(200).json({success: true, category: doc})
    })
  })
  
  // @route       GET api/products/categories
  // @description Get all categories
  // @access      Public
  router.get('/api/products/categories', (req, res) => {
   Category.find({}, (err, categories) => {
      if(err) return json.status(400).send(err);
        res.status(200).send(categories)
    })
  })

  module.exports = router;