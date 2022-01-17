const { Transaction } = require("../../models");
const {BadRequest} = require("http-errors")

const getAllAnnualTransactions = async (req, res) => {
    const { _id } = req.user
    const { year } = req.params

    const correctYearFormat = year.length === 4
   
    if (!correctYearFormat) {
        throw new BadRequest('Invalid year format.')
    }

    const transactions = await Transaction.find({ owner: _id })
    
    const incomesForYear = []
    const expensesForYear = []

    transactions.forEach(t => {
        
        const transactionYear = t.createdAt.split("-")[2]
        const transactionMonth = t.createdAt.split("-")[1]

        const isMonthInIncomes = incomesForYear.find(elm => elm.month === transactionMonth)
        const isMonthInExpense = expensesForYear.find(elm => elm.month === transactionMonth)

        const addData = (a, b) => {
             if (!a) {
                b.push({ month: transactionMonth, sum: t.sum })
                return
            }
            a.sum = Number((a.sum + t.sum).toFixed(2))
        }

        if (year === transactionYear && t.income) {
            addData(isMonthInIncomes, incomesForYear)
        }
        if (year === transactionYear && !t.income) {
            addData(isMonthInExpense, expensesForYear)
        }
    })

    res.json({
        status: 'sucsess',
      code: 200,
        data: {
            incomesForYear,
            expensesForYear
      }
    })

}

module.exports = getAllAnnualTransactions