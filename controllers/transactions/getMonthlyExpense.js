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
      const monthsShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", " Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const transactions = await Transaction.find({ owner: _id, income: false })
    const currentMonthTransactions = transactions.filter(t => {
        const month = t.createdAt.toString().split(" ")[1]
        const year = t.createdAt.toString().split(" ")[3]
        const transactionDate = `${monthsShortNames.indexOf(month) + 1}-${year}`
        if (date === transactionDate) {
            return t
        }
    })

    res.json({
        status: 'sucsess',
      code: 200,
      data: currentMonthTransactions
    })

}

module.exports = getMonthlyExpense