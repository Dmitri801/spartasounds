const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
// Middleware
const { auth } = require("../../middleware/auth");
const { admin } = require("../../middleware/admin");

let dbURI;

if (process.env.NODE_ENV === "production") {
  dbURI = process.env.ATLAS_URI;
} else {
  dbURI = process.env.MONGODB_URI;
}

// Set Up GridFS
let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("audiotracks");
});

// Create Storage Engine
const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "audiotracks"
        };
        resolve(fileInfo);
      });
    });
  },
  options: { useNewUrlParser: true }
});
const upload = multer({ storage });
// Audio Tracks API

// @route POST /api/audio/upload
// @desc upload file to DB
// ADMIN
router.post(
  "/api/audio/upload",
  auth,
  admin,
  upload.single("songFile"),
  (req, res) => {
    res.json({
      file: req.file
    });
  }
);

// @route GET /api/audio/files
// @desc display all files in JSON
// PUBLIC
router.get("/api/audio/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        error: "No Files Exist"
      });
    }
    // Files Exist
    res.json(files);
  });
});

// @route GET /api/audio/files/:id
// @desc Get Specific File Object
// PUBLIC
router.get("/api/audio/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "That File Doesn't Exist"
      });
    }
    res.json(file);
  });
});

// @route GET /api/audio/stream/:filename
// @desc Stream File
// PUBLIC
router.get("/api/audio/stream/:filename", (req, res) => {
  res.set({
    "Accept-Ranges": "bytes"
  });
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "That File Doesn't Exist"
      });
    }
    if (file.contentType === "audio/x-m4a") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        error: "This is not an audio file"
      });
    }
  });
});

module.exports = router;
