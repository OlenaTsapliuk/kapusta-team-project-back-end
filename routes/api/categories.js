const express = require("express");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");

const {
  addCategory,
  getAllCategories,
  deleteCategory
} = require("../../controllers/categories");

const { categoryJoiSchema } = require("../../models/category");
const router = express.Router();

router.post("/", authenticate, validation(categoryJoiSchema), controllerWrapper(addCategory));

router.get("/", authenticate, controllerWrapper(getAllCategories));

router.delete("/:categoryId", authenticate, controllerWrapper(deleteCategory));


module.exports = router;