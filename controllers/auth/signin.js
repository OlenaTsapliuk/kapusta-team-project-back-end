const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Wrong email or password");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "100h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        email,
        id: user._id,
        balance: user.balance,
        balanceHasBeenSet: user.balanceHasBeenSet,
      },
    },
  });
};

module.exports = signin;
