const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
