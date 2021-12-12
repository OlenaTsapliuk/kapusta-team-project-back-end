const { Schema, model } = require("mongoose");
const Joi = require("joi");


const transactionSchema = Schema(
  {
    sum: {
      type: Number,
      required: [true, "Sum is required"]
    },
    owner: {
      type: String,
      required: [true, "Owner is required"],
    },
    income: {
      type: Boolean,
      required: [true, "You should set a transaction type. Is it income? true/false"]
    },
    category: {
      type: String,
      required: [true, "You ust set a category"]
    }
  },
  { versionKey: false, timestamps: true }
);

const transactionJoiSchema = Joi.object({
  sum: Joi.number().required(),
  income: Joi.boolean().required(),
  category: Joi.string().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    transactionJoiSchema
};