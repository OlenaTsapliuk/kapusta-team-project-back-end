const { User, Transaction } = require("../../models");
const { BadRequest } = require("http-errors");
const correctDateFormat = require("./dateFormat")

const expense = async (req, res) => {
    const { sum, category, income, transactionName, createdAt } = req.body
    const { _id } = req.user
    
    if (!correctDateFormat(createdAt)) {
        throw new BadRequest("Wrong date format. Correct is DD-MM-YYYY")
    }

    if (income) {
        throw new BadRequest("Wrong transaction type")
    }

    const sumNormalized = Number(sum.toFixed(2))
    const owner = await User.findById(_id)
    const updatedBalance = owner.balance - sumNormalized
    await User.findByIdAndUpdate(_id, { balance: Number(updatedBalance.toFixed(2)) })
    

    const newTransaction = await Transaction.create({
        sum: sumNormalized,
        transactionName,
        category,
        income,
        owner: _id,
        createdAt
    })

    res.status(201).json({
        status: 'sucsess',
        code: 201,
        data: newTransaction,
        balance: Number(updatedBalance.toFixed(2))
    })
}

module.exports = expense