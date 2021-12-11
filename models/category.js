const { Schema } = require("mongoose");

const categorySchema = Schema({
  category: {
    type: String,
    required: [true, "Please select a category"],
  },
});

const Category = model("category", categorySchema);

module.exports = Category;
