import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../App.css";

import Login from "./Login";
import Tasks from "./Tasks";

const Home: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div>
            <h1>Task Manager</h1>
            {
                token? (
                    <div className="logoutButton">
                        <button onClick={logoutUser}>Logout</button>
                        <Tasks />
                    </div>
                ): (
                    <Login />
                )
            }
        </div>
    )
}

export default Home;