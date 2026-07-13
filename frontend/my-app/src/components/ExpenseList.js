import API from "../services/api";
import "../styles/dashboard.css";

function ExpenseList({
    expenses,
    refreshExpenses,
    setEditExpense
}) {

    const deleteExpense = async (id) => {

        const token = localStorage.getItem("token");

        try {

            await API.delete(`/expenses/${id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            refreshExpenses();

        } catch (error) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="table-card">

            <h2>Recent Transactions</h2>

            {
                expenses.length === 0 ? (

                    <p className="no-data">
                        No transactions found.
                    </p>

                ) : (

                    <table>

                        <thead>

                            <tr>

                                <th>Title</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                expenses.map((item) => (

                                    <tr key={item._id}>

                                        <td>{item.title}</td>

                                        <td>₹ {item.amount}</td>

                                        <td>{item.type}</td>

                                        <td>{item.category}</td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() => setEditExpense(item)}
                                            >
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteExpense(item._id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )
            }

        </div>

    );

}

export default ExpenseList;