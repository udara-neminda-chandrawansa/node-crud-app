import { useState } from "react";
import axios from "axios";
import API from "../api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / title */}
        <div className="text-center mb-8">
          <span className="text-3xl">✅</span>
          <h1 className="mt-2 text-lg font-semibold text-stone-800 tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-stone-400 mt-1">Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-xl px-6 py-7 space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={login}
            className="w-full py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 active:scale-95 transition-all"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;