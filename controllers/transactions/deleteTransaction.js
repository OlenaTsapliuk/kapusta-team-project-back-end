const { Transaction } = require("../../models");
const { NotFound } = require("http-errors");


const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params
    
    const transaction = await Transaction.findByIdAndRemove(transactionId)
    if (!transaction) {
        throw new NotFound("Transaction not found")
    }

    res.json({
        status: 'sucsess',
        code: 200,
        message: "Transaction deleted"
    })

}

module.exports = deleteTransaction