const express = require("express");
const cors = require("cors");
const db = require("./routes/db/database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend working!"
    });
});

app.get("/tasks", (req, res) => {

    db.all("SELECT * FROM tasks", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);

    });

});

app.post("/tasks", (req, res) => {

    const { title } = req.body;

    db.run(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        function(err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                id: this.lastID,
                title
            });

        }
    );

});

app.delete("/tasks/:id", (req, res) => {

    const { id } = req.params;

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Task deleted",
                changes: this.changes
            });

        }
    );

});

app.put("/tasks/:id", (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    db.run(
        "UPDATE tasks SET title = ? WHERE id = ?",
        [title, id],
        function(err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Task updated",
                changes: this.changes
            });

        }
    );

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
