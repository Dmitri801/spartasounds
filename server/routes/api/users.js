const express = require('express');
const router = express.Router();
// Middleware
const { auth } = require('../../middleware/auth');

// Models
const { User } = require("../../models/User");

// ============= USERS ============== //
// @route       GET api/users/auth
// @description Access a protected route
// @access      Private
router.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
      isAdmin: req.user.isAdmin,
      isAuth: true,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      cart: req.user.cart,
      history: req.user.history
    });
  });
  // @route       POST api/users/register
  // @description Registers A User
  // @access      Public
  router.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) {
        if(err.name === "MongoError") {
          return res.json({ success: false, message: "That Email Already Exists"})
        }
        return res.json({ success: false, err });
      } else {
        res.status(200).json({ success: true, userData: doc });
      }
    });
  });
  
  // @route       POST api/users/login
  // @description Login User
  // @access      Public
  router.post("/api/users/login", (req, res) => {
    // Find Email
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.json({ loginSuccess: false, message: "Email Not Found" });
      // If registered, check password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: "Incorrect Password" });
        } else {
          // Generate A Token
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res
              .cookie("x_auth", user.token)
              .status(200)
              .json({
                loginSuccess: true,
                message: `Welcome ${user.firstName}`
              });
          });
        }
      });
    });
  });
  
  // @route       GET api/users/logout
  // @description Logout a user
  // @access      Private
  router.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });

  module.exports = router;