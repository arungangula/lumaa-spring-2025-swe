import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiRoutes";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, inputUsername] = useState("");
    const [password, inputPassword] = useState("");

    const login = async() => {
        try {
            const response = await loginUser(username, password);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }
        catch {
            alert("Invalid Credentials");
        }
    }

    return (
        <div className="main-wrapper">
            <h2>Login</h2>
                    <input type="text" placeholder="Username" onChange={(e) => inputUsername(e.target.value)} /><br/>
                    <input type="password" placeholder="Password" onChange={(e) => inputPassword(e.target.value)} /><br/>
                    <button className="login" onClick={login}>Login</button>
                <div>Don't have an account? <Link to="/register">Register here</Link></div>
        </div>
    )
}

export default Login;