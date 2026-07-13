const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getCategorySummary
} = require("../controllers/expenseController");

// Add Expense
router.post("/", protect, addExpense);

// Get All Expenses
router.get("/", protect, getExpenses);

// Category Summary
router.get("/summary/category", protect, getCategorySummary);

// Update Expense
router.put("/:id", protect, updateExpense);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;