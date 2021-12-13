const { Transaction } = require("../../models");
const {BadRequest} = require("http-errors")

const getMonthlyExpense = async (req, res) => {
    const { _id } = req.user
    const { date } = req.params
    const correctMonthFormat = date.split("-")[0].length === 2
    const correctYearFormat = date.split("-")[1].length === 4
   
    if (!correctMonthFormat || !correctYearFormat) {
        throw new BadRequest('Invalid date format. Correct format is MM-YYYY')
    }

    const transactions = await Transaction.find({ owner: _id, income: false})
    const currentMonthTransactions = transactions.filter(t => {
        const dateToString = `${t.createdAt}`
        const transactionDate = `${dateToString.split(" ")[2]}-${dateToString.split(" ")[3]}`
        if (date === transactionDate) {
            return t
        }
    })

    res.json({
        status: 'sucsess',
      code: 200,
      data: { currentMonthTransactions }
    })

}

module.exports = getMonthlyExpense