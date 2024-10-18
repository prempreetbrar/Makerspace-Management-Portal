const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const cors = require("cors");

// localhost:{backend port} -> must match left half of line 8 in dockerfile;
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:8800", "http://frontend:80", "http://localhost:80", "http://frontend:8800", "http://backend:8080", "http://backend:5001", "http://localhost:8080", "http://localhost:5001"],
};

app.use(cors(corsOptions));

// Set up the database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
});

// Import models
const User = require('./models/User')(sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Sync models
sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

// Route to get all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users (backend):", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});
const listenPort = 8080; // must be the same as the LEFT part of the docker backend port. See the docker compose
app.listen(listenPort, () => {
console.log(`Server started on port ${listenPort}`);
});
