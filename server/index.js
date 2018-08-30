const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();

// Mongoose/MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
// Models
const { User } = require('./models/User');

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());




// =================================== //
// ============= Routes ============== //
// =================================== //
// ============= USERS ============== //
// @route       GET api/users/register
// @description Registers A User
// @access      Public
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) {
            return res.json({success: false, err})
        } else {
            res.status(200).json({ success: true, userData: doc })
        }
    })
})


app.listen(PORT, () => {
    console.log(`SERVER Running On Port: ${PORT}`);
})

