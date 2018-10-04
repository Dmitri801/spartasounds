const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const moment = require("moment");
const async = require("async");
// Middleware
const { auth } = require("../../middleware/auth");

// Models
const { User } = require("../../models/User");
const { Product } = require("../../models/Product");
const { Payment } = require("../../models/Payment");
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
      if (err.name === "MongoError") {
        return res.json({
          success: false,
          message: "That Email Already Exists"
        });
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

// @route      POST api/users/update_profile
// @description Update User Info
// @access      Private
router.post("/api/users/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({ success: true, doc });
    }
  );
});

// @route POST api/users/addToCart
// @description Add Item To Users Cart
// @access Private
router.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.json({ success: false, err });
    let duplicate = false;
    user.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

// @route GET api/users/removeFromCart
// @description Remove Item From Cart
// @access Private

router.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: {
          id: mongoose.Types.ObjectId(req.query._id)
        }
      }
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });
      Product.find({ _id: { $in: array } })
        .populate("genre")
        .populate("category")
        .exec((err, cartDetail) => {
          return res.status(200).json({ cartDetail: cartDetail, cart: cart });
        });
    }
  );
});

// @route GET api/users/successBuy
// @description SUCCESSFUL PURCHASE- Add purchased items to history of user, create "receipt" of purchase through the payment model
// @access Private

router.post("/api/users/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  // User History
  req.body.cartDetail.forEach(cartItem => {
    history.push({
      dateOfPurchase: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      name: cartItem.name,
      genre: cartItem.genre,
      samplePack: cartItem.samplePack,
      id: cartItem._id,
      price: cartItem.price,
      quantity: cartItem.quantity,
      paymentId: req.body.paymentData.paymentID
    });
  });

  // Add to user history/payment dashboard
  transactionData.user = {
    id: req.user._id,
    firstName: req.user.name,
    lastName: req.user.lastName,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });
        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              { $inc: { sold: item.quantity } },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.json({ success: false, err });
            res
              .status(200)
              .json({ success: true, cart: user.cart, cartDetail: [] });
          }
        );
      });
    }
  );
});

module.exports = router;
