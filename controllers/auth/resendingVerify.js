const { NotFound } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendingVerify = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;
  if (!email) {
    throw new NotFound("Wrong email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
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
    html: `<a href="https://kapusta-team-project-back-end.herokuapp.com/api/users/verify/${verificationToken}">Click to confirm email</a>`,
  };
  sendEmail(registerEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendingVerify;
