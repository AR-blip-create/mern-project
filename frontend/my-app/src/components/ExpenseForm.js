import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({ refreshExpenses, editExpense, clearEdit }) {

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        type: "Expense",
        category: ""
    });

    useEffect(() => {
        if (editExpense) {
            setExpense(editExpense);
        }
    }, [editExpense]);

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            if (editExpense) {

                await API.put(
                    `/expenses/${editExpense._id}`,
                    expense,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Expense Updated");

                clearEdit();

            } else {

                await API.post(
                    "/expenses",
                    expense,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Expense Added");

            }

            setExpense({
                title: "",
                amount: "",
                type: "Expense",
                category: ""
            });

            refreshExpenses();

        } catch (error) {

            alert("Operation Failed");

        }

    };

    return (

    <div className="form-card">

        <h2>
            {editExpense ? "Update Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={expense.title}
                onChange={handleChange}
            />

            <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={expense.amount}
                onChange={handleChange}
            />

            <select
                name="type"
                value={expense.type}
                onChange={handleChange}
            >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>

            <input
                type="text"
                name="category"
                placeholder="Enter Category"
                value={expense.category}
                onChange={handleChange}
            />

            <button type="submit">

                {editExpense ? "Update Transaction" : "Add Transaction"}

            </button>

        </form>

    </div>

);

}

export default ExpenseForm;