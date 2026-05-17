import { useEffect, useState } from "react";
import axios from "axios";

import API from "./api";
import Login from "./components/Login";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // load tasks
  const loadTasks = async () => {

    try {

      const res = await axios.get(
        `${API}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch {

      console.log("Unauthorized");

    }

  };

  useEffect(() => {

    if (token) {
      loadTasks();
    }

  }, [token]);

  // add task
  const addTask = async () => {

    if (!title) return;

    await axios.post(
      `${API}/tasks`,
      {
        title
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTitle("");

    loadTasks();

  };

  // delete task
  const deleteTask = async (id) => {

    await axios.delete(
      `${API}/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadTasks();

  };

  // logout
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

  };

  // show login first
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task App</h1>

      <button onClick={logout}>
        Logout
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>

        {tasks.map(task => (

          <li key={task.id}>

            {task.title}
            <input
              value={task.title}
              onChange={(e) => {
                const newTasks = tasks.map(t =>
                  t.id === task.id
                    ? { ...t, title: e.target.value }
                    : t
                );
                setTasks(newTasks);
              }}
            />

            <button
              onClick={async () => {
                await fetch(`${API}/tasks/${task.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    title: task.title
                  })
                });

                loadTasks();
              }}
            >
              Save
            </button>
            <button
              onClick={() =>
                deleteTask(task.id)
              }
            >
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>
  );

}

export default App;