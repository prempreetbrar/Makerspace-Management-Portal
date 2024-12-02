/**
 * The entry point for the backend Express server.
 * Sets up middleware (CORS), initializes database seeding, then starts the server.
 */

const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const seedDatabase = require('./seed');
const userRoutes = require('./routes/users');
const issueRoutes = require('./routes/issues');
const equipmentRoutes = require('./routes/equipment');
const bookingRoutes = require('./routes/bookings');
const requestRoutes = require('./routes/requests');
const utilsController = require('./controllers/utils');
const errorsController = require('./controllers/errors');
const listenPort = 8080; // Must be the same as the LEFT part of the docker backend port. See the docker compose

// localhost:{backend port} -> must match left half of line 8 in dockerfile;
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:8800',
        'http://frontend:80',
        'http://localhost:80',
        'http://frontend:8800',
        'http://backend:8080',
        'http://backend:5001',
        'http://localhost:8080',
        'http://localhost:5001',
    ],
    credentials: true,
};
// colorizes HTTP requests in logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// force usage of https in production
if (process.env.NODE_ENV === 'production') {
    app.use(utilsController.redirectUsingHTTPS);
}
app.use(cors(corsOptions));
app.use(express.json()); // lets us have JSON bodies in our requests
app.use(cookieParser()); // lets us parse cookies from our requests

seedDatabase();
app.use('/users', userRoutes);
app.use('/issues', issueRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/bookings', bookingRoutes);
app.use('/requests', requestRoutes);
app.use(errorsController.handleError); // handles errors in any of the routes that come before it

app.listen(listenPort, () => {
    console.log(`Server started on port ${listenPort}`);
});
