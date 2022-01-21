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
  setBalance,
  googleLogin,
  googleRedirect,
  loginViaGoogle
} = require("../../controllers/auth");

const { joiUserSchema, joiBalanceSchema, joiLoginViaGoogleSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiUserSchema), controllerWrapper(signup));
router.post("/signin", validation(joiUserSchema), controllerWrapper(signin));
router.post("/logout", authenticate, controllerWrapper(logout));

router.post(
  "/setBalance",
  validation(joiBalanceSchema),
  authenticate,
  controllerWrapper(setBalance)
);
router.get("/google", controllerWrapper(googleLogin));
router.get("/google-redirect", controllerWrapper(googleRedirect));
router.get("/login-via-google", validation(joiLoginViaGoogleSchema), controllerWrapper(loginViaGoogle))

module.exports = router;
