const getCurrentMonthTransactions = (transactions, date) => {
    return transactions.filter(t => {
        const month = t.createdAt.split("-")[1]
        const year = t.createdAt.split("-")[2]
        const transactionDate = `${month}-${year}`
        
        if (date === transactionDate) {
            return t
        }
    })
}

module.exports = getCurrentMonthTransactions