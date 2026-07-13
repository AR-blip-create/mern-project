import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>💰 Expense Tracker</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">

                        Login

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/register"> Register</Link>

                </p>

            </div>

        </div>

    );

}

export default Login;