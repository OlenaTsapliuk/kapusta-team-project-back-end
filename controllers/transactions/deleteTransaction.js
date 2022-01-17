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
    if (transaction.income) {
        const updatedBalance = owner.balance - transaction.sum
        await User.findByIdAndUpdate(_id, { balance: Number(updatedBalance.toFixed(2)) })
        res.json({
        status: 'sucsess',
        code: 200,
        message: "Transaction deleted",
        balance: Number(updatedBalance.toFixed(2))
    })
    }
    if (!transaction.income) {
        const updatedBalance = owner.balance + transaction.sum
        await User.findByIdAndUpdate(_id, { balance: Number(updatedBalance.toFixed(2)) })
        res.json({
        status: 'sucsess',
        code: 200,
        message: "Transaction deleted",
        balance: Number(updatedBalance.toFixed(2))
    })
    }
}

module.exports = deleteTransaction