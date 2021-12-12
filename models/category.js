const { Schema } = require("mongoose");

const categorySchema = Schema({
  category: {
    type: String,
    required: [true, "Please select a category"],
  },
  income: {
    type: Boolean,
    required: [true, "Category type is required"]
  },
  basicCategory: {
    type: Boolean,
    required: [true, "Category type is required"]
  },
  owner: {
    type: String
  }
  
}, { versionKey: false, timestamps: true });

const Category = model("category", categorySchema);

module.exports = Category;
