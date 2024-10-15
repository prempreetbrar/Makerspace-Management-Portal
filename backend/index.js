const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173"], // Vite server port
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
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

app.listen(8080, () => {
console.log("Server started on port 8080");
});
