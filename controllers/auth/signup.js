const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} already exist`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    user: {
      email,
    },
  });
};
module.exports = signup;
