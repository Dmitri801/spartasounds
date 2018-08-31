const express = require('express');
const router = express.Router();
// Middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
// Models
const { Genre } = require("../../models/Genre");

// ============= GENRE ============== //
// @route       POST api/products/genre
// @description Create A New Genre 
// @access      Admin
router.post("/api/products/genre", auth, admin, (req, res) => {
    const genre = new Genre(req.body);
  
    genre.save((err, doc) => {
      if(err) return res.json({ success: false, err })
         res.status(200).json({success: true, genre: doc})
    })
  })
  
  // @route       GET api/products/genres
  // @description Get all genres
  // @access      Public
  router.get('/api/products/genres', (req, res) => {
    Genre.find({}, (err, genres) => {
      if(err) return json.status(400).send(err);
        res.status(200).send(genres)
    })
  })

  module.exports = router;