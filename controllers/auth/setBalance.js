const { User } = require("../../models");

const setBalance = async (req, res) => {
    const { balance } = req.body;
  const { _id } = req.user;
  
  const balanceNormalized = Number(balance.toFixed(2))
  
  await User.findByIdAndUpdate(_id, { balance: balanceNormalized, balanceHasBeenSet: true });
  res.status(201).json({
    status: "success",
    code: 201,
    message: `User balance set as ${balanceNormalized} value`,
    balance: balanceNormalized
  });
}

module.exports = setBalance