const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
require("./db/database"); // initializes DB

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API running clean structure!" });
});

// routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});