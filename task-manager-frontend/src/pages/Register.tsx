import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apiRoutes";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async() => {
        try {
            await registerUser(username, password);
            alert("Registration Successful!");
            navigate("/login");
        }
        catch {
            alert("Registration Failed. Please try login if already registered.");
        }   
    }

    return (
        <div className="main-wrapper">
            <h2>Register</h2>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
                <button className="register" onClick={register}>Register</button>
                <div>Already have an account? <Link to="/login">Login here</Link></div>
        </div>
        
    )
}

export default Register;