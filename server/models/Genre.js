const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1
  }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = { Genre };
