const express = require("express");
const cors = require("cors");
const db = require("./database");

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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
