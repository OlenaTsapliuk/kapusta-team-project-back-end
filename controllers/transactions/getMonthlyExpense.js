const { Transaction } = require("../../models");
const { BadRequest } = require("http-errors")
const getCurrentMonthTransactions = require("./getCurrentMonthTransactions")

const getMonthlyExpense = async (req, res) => {
    const { _id } = req.user
    const { date } = req.params

    const correctDateFormat = date.split("-").length === 2 && date.split("-")[0].length === 2 && date.split("-")[1].length === 4
    if (!correctDateFormat) {
        throw new BadRequest('Invalid date format.')
    }

    const transactions = await Transaction.find({ owner: _id, income: false })
    const data = getCurrentMonthTransactions(transactions, date)

    res.json({
        status: 'sucsess',
      code: 200,
      data
    })

}

module.exports = getMonthlyExpense