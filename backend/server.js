const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
require("./db/database"); // initializes DB

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API running clean structure!" });
});

// routes
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});