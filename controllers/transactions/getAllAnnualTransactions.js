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
        const transactionYear = t.createdAt.toString().split(" ")[3]
        if (year === transactionYear) {
            return t
        }
    })
    const incomesForYear =[ 
        { month: "Jan", sum: 0 },
        { month: "Feb", sum: 0 },
        { month: "Mar", sum: 0 },
        { month: "Apr", sum: 0 },
        { month: "May", sum: 0 },
        { month: "Jun", sum: 0 },
        { month: "Jul", sum: 0 },
        { month: "Aug", sum: 0 },
        { month: "Sep", sum: 0 },
        { month: "Oct", sum: 0 },
        { month: "Nov", sum: 0 },
        { month: "Dec", sum: 0 }
    ]
    const expensesForYear = [ 
        { month: "Jan", sum: 0 },
        { month: "Feb", sum: 0 },
        { month: "Mar", sum: 0 },
        { month: "Apr", sum: 0 },
        { month: "May", sum: 0 },
        { month: "Jun", sum: 0 },
        { month: "Jul", sum: 0 },
        { month: "Aug", sum: 0 },
        { month: "Sep", sum: 0 },
        { month: "Oct", sum: 0 },
        { month: "Nov", sum: 0 },
        { month: "Dec", sum: 0 }
    ]
    currentYearTransactions.forEach(t => {
        const month = t.createdAt.toString().split(" ")[1]
        incomesForYear.forEach(m => {
            if (month === m.month && t.income) {
                m.sum += t.sum
            }
        })
        expensesForYear.forEach(m => {
            if (month === m.month && !t.income) {
                m.sum += t.sum
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