const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const os = require("os");

// Use a writable directory: $HOME/.crud-app/
const dataDir = path.join(os.homedir(), ".crud-app");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, "database.db");

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite database");
    }

});

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

module.exports = db;
