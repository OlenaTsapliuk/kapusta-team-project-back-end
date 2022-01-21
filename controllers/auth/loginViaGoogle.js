const { BadRequest, NotFound } = require("http-errors");
const { User } = require("../../models");

const loginViaGoogle = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFound("User not found")
    }
    if (!user.google) {
        throw new BadRequest("User wasn't registred from google, please use login form with password");
    }

  res.status(201).json({
    status: "success",
    code: 201,
      user: {
          email,
          _id: user._id,
          balance: user.balance,
          balanceHasBeenSet: user.balanceHasBeenSet,
    }
  });

}

module.exports = loginViaGoogle