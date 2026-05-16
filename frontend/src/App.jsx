import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {

    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();

    setTasks(data);

  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {

    if (!title) return;

    await fetch("http://localhost:3000/tasks", {
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
          <li key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
