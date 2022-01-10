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

    const owner = await User.findById(_id)
    const updatedBalance = owner.balance - Number(sum)
    await User.findByIdAndUpdate(_id, { balance: updatedBalance })


    const newTransaction = await Transaction.create({
        sum,
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
        balance: updatedBalance
    })
}

module.exports = expense