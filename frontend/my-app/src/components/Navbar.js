import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Navbar(){

    const navigate=useNavigate();

    const logout=()=>{

        localStorage.removeItem("token");

        navigate("/");

    }

    return(

        <div className="navbar">

            <h2>Personal Expense Tracker</h2>

            <button
            className="logout-btn"
            onClick={logout}>

                Logout

            </button>

        </div>

    )

}

export default Navbar;