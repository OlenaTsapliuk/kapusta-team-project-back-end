const { Transaction } = require("../../models");
const {BadRequest} = require("http-errors")

const getAllAnnualTransactions = async (req, res) => {
    const { _id } = req.user
    const { year } = req.params

    const correctYearFormat = year.length === 4
   
    if (!correctYearFormat) {
        throw new BadRequest('Invalid year format.')
    }

    const transactions = await Transaction.find({ owner: _id})
    const currentYearTransactions = transactions.filter(t => {
        const transactionYear = t.createdAt.split("-")[2]
        if (year === transactionYear) {
            return t
        }
    })
    const incomesForYear =[ 
        { month: "01", sum: 0 },
        { month: "02", sum: 0 },
        { month: "03", sum: 0 },
        { month: "04", sum: 0 },
        { month: "05", sum: 0 },
        { month: "06", sum: 0 },
        { month: "07", sum: 0 },
        { month: "08", sum: 0 },
        { month: "09", sum: 0 },
        { month: "10", sum: 0 },
        { month: "11", sum: 0 },
        { month: "12", sum: 0 }
    ]
    const expensesForYear = [ 
        { month: "01", sum: 0 },
        { month: "02", sum: 0 },
        { month: "03", sum: 0 },
        { month: "04", sum: 0 },
        { month: "05", sum: 0 },
        { month: "06", sum: 0 },
        { month: "07", sum: 0 },
        { month: "08", sum: 0 },
        { month: "09", sum: 0 },
        { month: "10", sum: 0 },
        { month: "11", sum: 0 },
        { month: "12", sum: 0 }
    ]
    currentYearTransactions.forEach(t => {
        const month = t.createdAt.split("-")[1]
        incomesForYear.forEach(m => {
            if (month === m.month && t.income) {
                m.sum = Number((m.sum + t.sum).toFixed(2))
            }
        })
        expensesForYear.forEach(m => {
            if (month === m.month && !t.income) {
                m.sum = Number((m.sum + t.sum).toFixed(2))
            }
        })
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