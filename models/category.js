const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
    default: false,
    required: [true, "Category type is required"]
  },
  owner: {
    type: String
  },
  iconName: {
    type: String
  }
  
}, { versionKey: false, timestamps: true });

const categoryJoiSchema = Joi.object({
  category: Joi.string().required(),
  income: Joi.boolean().required(),
  basicCategory: Joi.boolean(),
  iconName: Joi.string()
});

const Category = model("category", categorySchema);

module.exports = {
  Category,
  categoryJoiSchema
};
