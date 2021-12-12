const signup = require("./signup");
const signin = require("./signin");
const logout = require("./logout");
const verify = require("./verify");
const resendingVerify = require("./resendingVerify");
const setBalance = require("./setBalance")

module.exports = {
  signup,
  signin,
  logout,
  verify,
  resendingVerify,
  setBalance
};
