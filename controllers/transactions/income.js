const { User, Transaction } = require("../../models");
const { BadRequest } = require("http-errors");

const income = async (req, res) => {
    const { sum, category, income } = req.body
    const { _id } = req.user
    
    if (!income) {
        throw new BadRequest("Wrong transaction type")
    }

    const owner = await User.findById(_id)
    const updatedBalance = owner.balance + Number(sum)
    await User.findByIdAndUpdate(_id, { balance: updatedBalance })

    const newTransaction = {
        sum,
        category,
        income,
        owner: _id
    }
    
    await Transaction.create(newTransaction)

    res.status(201).json({
        status: 'sucsess',
        code: 201,
        data: { newTransaction }
    })

}



module.exports = income