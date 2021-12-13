const { Transaction } = require("../../models");
const {BadRequest} = require("http-errors")

const getAllMonthlyData = async (req, res) => {
    const { _id } = req.user
    const { date } = req.params
    const correctMonthFormat = date.split("-")[0].length === 2
    const correctYearFormat = date.split("-")[1].length === 4
   
    if (!correctMonthFormat || !correctYearFormat) {
        throw new BadRequest('Invalid date format. Correct format is MM-YYYY')
    }
      const monthsShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", " Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const transactions = await Transaction.find({ owner: _id})
    const currentMonthTransactions = transactions.filter(t => {
        const month = t.createdAt.toString().split(" ")[1]
        const year = t.createdAt.toString().split(" ")[3]
        const transactionDate = `${monthsShortNames.indexOf(month) + 1}-${year}`
        if (date === transactionDate) {
            return t
        }
    })

    const allIncomeTransactions = currentMonthTransactions.filter(t => t.income)
    const allExpenseTransactions = currentMonthTransactions.filter(t => !t.income)

    const allIncomes = allIncomeTransactions.reduce((acc, transaction) => acc + transaction.sum, 0)
    const allExpenses = allExpenseTransactions.reduce((acc, transaction) => acc + transaction.sum, 0)

    const allIncomeUnicCategories = []
    allIncomeTransactions.forEach(t => {
        if (!allIncomeUnicCategories.includes(t.category)) {
            allIncomeUnicCategories.push(t.category)
        }
    })

    const allExpenseUnicCategories = []
    allExpenseTransactions.forEach(t => {
        if (!allExpenseUnicCategories.includes(t.category)) {
            allExpenseUnicCategories.push(t.category)
        }
    })

    const allIncomeUnicTransactionNames = []
     allIncomeTransactions.forEach(t => {
        if (!allIncomeUnicTransactionNames.includes(t.transactionName)) {
            allIncomeUnicTransactionNames.push(t.transactionName)
        }
     })
    
    const allExpenseUnicTransactionNames = []
     allExpenseTransactions.forEach(t => {
        if (!allExpenseUnicTransactionNames.includes(t.transactionName)) {
            allExpenseUnicTransactionNames.push(t.transactionName)
        }
     })
    

    const income = []
    allIncomeUnicCategories.forEach(cat => {
        income.push({
            category: cat,
            totalSum: 0,
            transactions: []
        })
        allIncomeTransactions.forEach(transaction => {
            if (transaction.category === cat) {
                const obj = income.find(c => c.category === cat)
                obj.totalSum += transaction.sum
                // obj.transactions.push({
                //     transactionName: 'transaction.transactionName',
                //     transactionTotalSum: 'transaction.sum'
                // })
                // allIncomeUnicTransactionNames.forEach(name => {
                //     if (name === transaction.transactionName) {
                //         obj.transactions.push({
                //             transactionName: name,
                //             transactionTotalSum: 0
                //         })
                //     }
                // })
            }
        })
    })

    const expense = [] 
    allExpenseUnicCategories.forEach(cat => {
        expense.push({
            category: cat,
            totalSum: 0,
            transactions: []
        })
         allExpenseTransactions.forEach(transaction => {
            if (transaction.category === cat) {
                const obj = expense.find(c => c.category === cat)
                obj.totalSum += transaction.sum
            }
        })
    })


    const result = {
        allIncomes,
        allExpenses,
        income,
        expense
    }

    res.json({
        status: 'sucsess',
      code: 200,
      data:  result
    })
}

module.exports = getAllMonthlyData