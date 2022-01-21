const signup = require("./signup");
const signin = require("./signin");
const logout = require("./logout");
const setBalance = require("./setBalance");
const googleLogin = require("./googleLogin");
const googleRedirect = require("./googleRedirect");
const loginViaGoogle = require("./loginViaGoogle")

module.exports = {
  signup,
  signin,
  logout,
  setBalance,
  googleLogin,
  googleRedirect,
  loginViaGoogle
};
