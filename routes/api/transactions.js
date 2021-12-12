const express = require("express");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");

const {
  expense,
  income,
  deleteTransaction,
  getMonthlyIncome,
  getMonthlyExpense
} = require("../../controllers/transactions");

const { transactionJoiSchema } = require("../../models/transaction");
const router = express.Router();

router.post("/expense", authenticate, validation(transactionJoiSchema), controllerWrapper(expense));
router.post("/income", authenticate, validation(transactionJoiSchema), controllerWrapper(income));
router.delete("/:transactionId", authenticate, controllerWrapper(deleteTransaction));

router.get("/income/:date", authenticate, controllerWrapper(getMonthlyIncome));
router.get("/expense/:date", authenticate, controllerWrapper(getMonthlyExpense));


module.exports = router;