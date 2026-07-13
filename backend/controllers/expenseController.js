const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
    try {

        const { title, amount, type, category } = req.body;

        const expense = await Expense.create({
            user: req.user.id,
            title,
            amount,
            type,
            category
        });

        res.status(201).json(expense);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Expenses
const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({
            user: req.user.id
        });

        res.status(200).json(expenses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Expense
const updateExpense = async (req, res) => {

    try {

        const expense = await Expense.findById(req.params.id);

        if (!expense) {

            return res.status(404).json({
                message: "Expense not found"
            });

        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(updatedExpense);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Expense
const deleteExpense = async (req, res) => {

    try {

        const expense = await Expense.findById(req.params.id);

        if (!expense) {

            return res.status(404).json({
                message: "Expense not found"
            });

        }

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Expense Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Category Summary
const getCategorySummary = async (req, res) => {

    try {

        const summary = await Expense.aggregate([

            {
                $match: {
                    user: req.user.id,
                    type: "Expense"
                }
            },

            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            }

        ]);

        res.status(200).json(summary);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getCategorySummary
};