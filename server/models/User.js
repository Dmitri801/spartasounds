const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SALT_I = 10;
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
})

userSchema.pre("save", function(next) {
    var user = this;
    if (user.isModified("password")) {
      bcrypt.genSalt(SALT_I, function(err, salt) {
        if (err) return next(err);
  
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

  // Create compare password method, and compare with bcrypt
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  
  // Create method to generate a token for the user logging in
  userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  
    user.token = token;
    user.save((err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  };
  
  // Create Method to find by a user token
  userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET, function(err, decode) {
      user.findOne({ _id: decode, token: token }, function(err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  };

const User = mongoose.model('User', userSchema);

module.exports = { User };