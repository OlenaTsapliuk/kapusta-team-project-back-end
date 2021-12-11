const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendingVerify = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;
  if (!email) {
    res.status(400).json({
      code: 400,
      message: "Missing required field email",
    });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      code: 400,
      message: "User not found",
    });
    return;
  }
  if (user.verify) {
    res.status(400).json({
      code: 400,
      message: "Verification has already been passed",
    });
    return;
  }

  const registerEmail = {
    to: email,
    subject: "Registration confirm",
    html: `<a href="http://localhost:3001/api/auth/verify/${verificationToken}">Click to confirm email</a>`,
  };
  sendEmail(registerEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendingVerify;
