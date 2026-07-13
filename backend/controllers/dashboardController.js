const Expense = require("../models/Expense");

const getDashboard = async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user.id
        });

        let totalIncome = 0;
        let totalExpense = 0;

        expenses.forEach((item) => {

            if (item.type === "Income") {
                totalIncome += item.amount;
            } else {
                totalExpense += item.amount;
            }

        });

        const currentBalance = totalIncome - totalExpense;

        res.status(200).json({

            totalIncome,

            totalExpense,

            currentBalance,

            totalTransactions: expenses.length,

            recentTransactions: expenses.slice(-5).reverse()

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getDashboard
};