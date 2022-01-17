const { Transaction, User } = require("../../models");
const { NotFound } = require("http-errors");


const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params
    const { _id } = req.user
    
    const transaction = await Transaction.findByIdAndRemove(transactionId)
    if (!transaction) {
        throw new NotFound("Transaction not found")
    }

    const owner = await User.findById(_id)
    let balance = owner.balance

    if (transaction.income) {
        balance = Number((balance - transaction.sum).toFixed(2))
    }
    if (!transaction.income) {
        balance = Number((balance + transaction.sum).toFixed(2))
    }
    
    await User.findByIdAndUpdate(_id, { balance })

    res.json({
        status: 'sucsess',
        code: 200,
        message: "Transaction deleted",
        balance
    })
}

module.exports = deleteTransaction