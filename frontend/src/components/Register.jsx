import { useState } from "react";
import axios from "axios";
import API from "../api";

function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const register = async () => {
    setError("");
    try {
      await axios.post(`${API}/auth/register`, { username, password });
      setSuccess(true);
      setTimeout(() => onSwitch(), 1500);
    } catch (err) {
      setError("Registration failed. Try a different username.");
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
          <p className="text-sm text-stone-400 mt-1">Create an account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-xl px-6 py-7 space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && register()}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && register()}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          {success && (
            <p className="text-xs text-emerald-600 text-center">
              Account created! Redirecting…
            </p>
          )}

          <button
            onClick={register}
            className="w-full py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 active:scale-95 transition-all"
          >
            Create account
          </button>

          <p className="text-center text-xs text-stone-400">
            Already have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-stone-600 hover:text-stone-800 underline underline-offset-2 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;