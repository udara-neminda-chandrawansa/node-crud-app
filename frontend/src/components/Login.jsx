import { useState } from "react";
import axios from "axios";
import API from "../api";

function Login({ setToken }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const res = await axios.post(
                `${API}/auth/login`,
                {
                    username,
                    password
                }
            );

            const token = res.data.token;

            localStorage.setItem("token", token);

            setToken(token);

        } catch {

            alert("Login failed");

        }

    };

    return (
        <div>

            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />

            <button onClick={login}>
                Login
            </button>

        </div>
    );

}

export default Login;