const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

let dbURI;

if (process.env.NODE_ENV === "production") {
  dbURI = process.env.ATLAS_URI;
} else {
  dbURI = process.env.MONGODB_URI;
}
// Middleware
const { auth } = require("../../middleware/auth");
const { admin } = require("../../middleware/admin");

// Set Up GridFS
let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("test");
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
          bucketName: "test"
        };
        resolve(fileInfo);
      });
    });
  },
  options: { useNewUrlParser: true }
});
const upload = multer({ storage });

// TEST UPLOAD API

// @route POST /api/test/upload
// @desc upload file to DB TEST
// ADMIN
router.post(
  "/api/test/upload",
  auth,
  admin,
  upload.single("testFile"),
  (req, res) => {
    res.json({
      file: req.file
    });
  }
);

// @route GET /api/test/stream/:filename
// @desc Stream File
// PUBLIC
router.get("/api/test/stream/:filename", (req, res) => {
  res.set({
    "Accept-Ranges": "bytes",
    "Content-Disposition": `attachment; filename=${req.params.filename}`,
    "Content-Type": "application/zip"
  });
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "That File Doesn't Exist"
      });
    }
    if (file.contentType === "application/zip") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        error: "This is not an zip file"
      });
    }
  });
});

router.get("/api/test/dummy", (req, res) => {
  res.redirect(
    "http://localhost:8080/api/test/stream/47c45dccd515a0f77d1a3ca738d7eecd.zip"
  );
});

module.exports = router;
