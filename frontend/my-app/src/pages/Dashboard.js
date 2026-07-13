import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpensePieChart from "../components/ExpensePieChart";

import "../styles/dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        loadDashboard();
        loadExpenses();
        loadCategorySummary();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await API.get("/dashboard", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setDashboard(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadExpenses = async () => {

        try {

            const res = await API.get("/expenses", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setExpenses(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadCategorySummary = async () => {

        try {

            const res = await API.get("/expenses/summary/category", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setCategoryData(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const refresh = () => {

        loadDashboard();
        loadExpenses();
        loadCategorySummary();

    };

    return (

        <div className="dashboard-container">

            <Navbar />

            <div className="cards">

                <DashboardCard
                    title="Current Balance"
                    value={dashboard.currentBalance}
                    color="balance-card"
                />

                <DashboardCard
                    title="Total Income"
                    value={dashboard.totalIncome}
                    color="income-card"
                />

                <DashboardCard
                    title="Total Expense"
                    value={dashboard.totalExpense}
                    color="expense-card"
                />

            </div>
{/* 
            <ExpensePieChart
                data={categoryData}
            /> */}

            <ExpenseForm
                refreshExpenses={refresh}
                editExpense={editExpense}
                clearEdit={() => setEditExpense(null)}
            />

            <ExpenseList
                expenses={expenses}
                refreshExpenses={refresh}
                setEditExpense={setEditExpense}
            />

        </div>

    );

}

export default Dashboard;