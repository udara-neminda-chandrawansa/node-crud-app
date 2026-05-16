import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const API = "http://localhost:3000";

  const loadTasks = async () => {

    const res = await fetch(`${API}/tasks`);
    const data = await res.json();

    setTasks(data);

  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {

    if (!title) return;

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title
      })
    });

    setTitle("");

    loadTasks();

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task App</h1>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex gap-2">
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
              onClick={async () => {
                await fetch(`${API}/tasks/${task.id}`, {
                  method: "DELETE"
                });

                loadTasks();
              }}
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
