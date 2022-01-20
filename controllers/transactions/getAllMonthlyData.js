const { Transaction, Category } = require("../../models");
const {BadRequest} = require("http-errors")

const getAllMonthlyData = async (req, res) => {
    const { _id } = req.user
    const { date } = req.params

    const correctDateFormat = date.split("-").length === 2 && date.split("-")[0].length === 2 && date.split("-")[1].length === 4
    if (!correctDateFormat) {
        throw new BadRequest('Invalid date format.')
    }

    const transactions = await Transaction.find({ owner: _id})
    const currentMonthTransactions = transactions.filter(t => {
        const month = t.createdAt.split("-")[1]
        const year = t.createdAt.split("-")[2]
        const transactionDate = `${month}-${year}`
        if (date === transactionDate) {
            return t
        }
    })

    const allIncomeTransactions = currentMonthTransactions.filter(t => t.income)
    const allExpenseTransactions = currentMonthTransactions.filter(t => !t.income)

    const allIncomes = allIncomeTransactions.reduce((acc, transaction) => acc + transaction.sum, 0)
    const allExpenses = allExpenseTransactions.reduce((acc, transaction) => acc + transaction.sum, 0)

    const userCategories = await Category.find({ owner: _id })
    const basicCategories = await Category.find({ basicCategory: true })
    const allCategories = [...userCategories, ...basicCategories]

    const allIncomeUnicCategories = []
    const allExpenseUnicCategories = []

    currentMonthTransactions.forEach(t => {
        if (!allIncomeUnicCategories.includes(t.category) && t.income) {
            allIncomeUnicCategories.push(t.category)
        }
        if (!allExpenseUnicCategories.includes(t.category) && !t.income) {
            allExpenseUnicCategories.push(t.category)
        }
    })

    const incomes = []
    allIncomeUnicCategories.forEach(cat => {
        incomes.push({
            category: cat,
            totalSum: 0,
            iconName: "",
            transactions: []
        })

        allCategories.forEach(c => {
            if (c.category === cat) {
                incomes.forEach(inc => {
                    if (inc.category === c.category) {
                        inc.iconName = c.iconName
                    }
                })
            }
        })
    
        allIncomeTransactions.forEach(transaction => {
            if (transaction.category === cat) {
                const obj = incomes.find(c => c.category === cat)
                obj.totalSum = Number((obj.totalSum + transaction.sum).toFixed(2))
                const isNameInList = obj.transactions.find( i => i.transactionName === transaction.transactionName)
                if (!isNameInList) {
                    obj.transactions.push({
                        transactionName: transaction.transactionName,
                        transactionTotalSum: transaction.sum
                    })
                    return
                }
                isNameInList.transactionTotalSum = Number((isNameInList.transactionTotalSum + transaction.sum).toFixed(2))
            }
        })
        
    })

    const expenses = [] 
    allExpenseUnicCategories.forEach(cat => {
        expenses.push({
            category: cat,
            totalSum: 0,
            iconName: "",
            transactions: []
        })

        allCategories.forEach(c => {
            if (c.category === cat) {
                expenses.forEach(exp => {
                    if (exp.category === c.category) {
                        exp.iconName = c.iconName
                    }
                })
                
            }
        })

        allExpenseTransactions.forEach(transaction => {
            if (transaction.category === cat) {
                const obj = expenses.find(c => c.category === cat)
                obj.totalSum = Number((obj.totalSum + transaction.sum).toFixed(2))
                const isNameInList = obj.transactions.find( i => i.transactionName === transaction.transactionName)
                if (!isNameInList) {
                    obj.transactions.push({
                        transactionName: transaction.transactionName,
                        transactionTotalSum: transaction.sum
                    })
                    return
                }
                isNameInList.transactionTotalSum = Number((isNameInList.transactionTotalSum + transaction.sum).toFixed(2))
                }
        })
})

    const result = {
        allIncomes: Number(allIncomes.toFixed(2)),
        allExpenses: Number(allIncomes.toFixed(2)),
        incomes,
        expenses
    }

    res.json({
        status: 'sucsess',
      code: 200,
      data:  result
    })
}

module.exports = getAllMonthlyData