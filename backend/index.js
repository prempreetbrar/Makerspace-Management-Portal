/**
 * The entry point for the backend Express server. 
 * Sets up middleware (CORS), initializes database seeding, then starts the server.
 */

const express = require("express");
const app = express();
const cors = require("cors");
const seedDatabase = require("./seed");
const userRoutes = require("./routes/users");
const issueRoutes = require("./routes/issues");
const equipmentRoutes = require("./routes/equipment");
const bookingRoutes = require("./routes/bookings");
const requestRoutes = require("./routes/requests");
const listenPort = 8080; // must be the same as the LEFT part of the docker backend port. See the docker compose

// localhost:{backend port} -> must match left half of line 8 in dockerfile;
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:8800", "http://frontend:80", "http://localhost:80", "http://frontend:8800", "http://backend:8080", "http://backend:5001", "http://localhost:8080", "http://localhost:5001"],
};
app.use(cors(corsOptions));

seedDatabase();
app.use("/users", userRoutes); //shouldn't this be "users", not "/users"?
app.use("/issues", issueRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/bookings", bookingRoutes);
app.use("/requests", requestRoutes);

app.listen(listenPort, () => {
console.log(`Server started on port ${listenPort}`);
});
