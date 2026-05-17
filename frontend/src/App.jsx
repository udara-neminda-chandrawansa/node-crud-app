import { useEffect, useState } from "react";
import axios from "axios";

import API from "./api";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username] = useState(localStorage.getItem("username"));
  const [mode, setMode] = useState("login"); // login | register

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch {
      console.log("Unauthorized");
    }
  };

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(
      `${API}/tasks`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  const updateTask = async (task) => {
    await axios.put(
      `${API}/tasks/${task.id}`,
      { title: task.title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    if (mode === "login") {

      return (
        <Login
          setToken={setToken}
          onSwitch={() => setMode("register")}
        />
      );

    }

    return (
      <Register
        onSwitch={() => setMode("login")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <h1 className="text-lg font-semibold text-stone-800 tracking-tight">
            Tasks | {username}
          </h1>
        </div>
        <button
          onClick={logout}
          className="text-sm text-stone-500 hover:text-stone-800 transition-colors px-3 py-1.5 rounded-md hover:bg-stone-100"
        >
          Sign out
        </button>
      </header>

      {/* Main */}
      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Add task input */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="What needs doing?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          <button
            onClick={addTask}
            className="px-4 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 active:scale-95 transition-all"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        {tasks.length === 0 ? (
          <p className="text-center text-stone-400 text-sm py-12">
            No tasks yet — add one above.
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-4 py-3 group"
              >
                <input
                  value={task.title}
                  onChange={(e) => {
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, title: e.target.value } : t
                      )
                    );
                  }}
                  className="flex-1 text-sm text-stone-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-stone-300 rounded px-1 py-0.5"
                />
                <button
                  onClick={() => updateTask(task)}
                  className="text-xs text-stone-400 hover:text-emerald-600 transition-colors px-2 py-1 rounded hover:bg-emerald-50 opacity-0 group-hover:opacity-100"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs text-stone-400 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.length > 0 && (
          <p className="text-center text-stone-400 text-xs mt-6">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;