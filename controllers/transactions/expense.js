const { User, Transaction } = require("../../models");
const { BadRequest } = require("http-errors");

const expense = async (req, res) => {
    const { sum, category, income, transactionName } = req.body
    const { _id } = req.user
    
    if (income) {
        throw new BadRequest("Wrong transaction type")
    }

    const owner = await User.findById(_id)
    const updatedBalance = owner.balance - Number(sum)
    await User.findByIdAndUpdate(_id, { balance: updatedBalance })


    const newTransaction = await Transaction.create({
        sum,
        transactionName,
        category,
        income,
        owner: _id
    })

    res.status(201).json({
        status: 'sucsess',
        code: 201,
        data: newTransaction,
        balance: updatedBalance
    })
}

module.exports = expense