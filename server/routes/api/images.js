const express = require("express");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
require("dotenv").config();
const { auth } = require("../../middleware/auth");
const { admin } = require("../../middleware/admin");
const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Images API

// @route POST /api/images/upload
// @desc upload image file
// ADMIN
router.post("/api/images/upload", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

// @route GET /api/images/removeimage
// @desc remove image file
router.get("/api/images/removeimage", (req, res) => {
  let image_id = req.query.public_id;
  cloudinary.uploader.destroy(image_id, (result, err) => {
    if (err) return res.json({ success: false, error: err });
    res.status(200).send({ success: true });
  });
});

module.exports = router;
