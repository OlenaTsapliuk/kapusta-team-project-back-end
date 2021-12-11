const express = require("express");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");

const {
  signup,
  signin,
  logout,
  verify,
  resendingVerify,
} = require("../../controllers/auth");

const { joiUserSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiUserSchema), controllerWrapper(signup));
router.post("/signin", validation(joiUserSchema), controllerWrapper(signin));
router.post("/logout", authenticate, controllerWrapper(logout));

router.get("/verify/:verificationToken", controllerWrapper(verify));
router.post("/verify/", controllerWrapper(resendingVerify));

module.exports = router;
