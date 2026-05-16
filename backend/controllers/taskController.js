const db = require("../db/database");

// GET all tasks
exports.getTasks = (req, res) => {

    db.all("SELECT * FROM tasks", [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);

    });

};

// CREATE task
exports.createTask = (req, res) => {

    const { title } = req.body;

    db.run(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                id: this.lastID,
                title
            });

        }
    );

};

// DELETE task
exports.deleteTask = (req, res) => {

    const { id } = req.params;

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Task deleted"
            });

        }
    );

};

// UPDATE task
exports.updateTask = (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    db.run(
        "UPDATE tasks SET title = ? WHERE id = ?",
        [title, id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Task updated"
            });

        }
    );

};