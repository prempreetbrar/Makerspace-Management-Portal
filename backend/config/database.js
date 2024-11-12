/**
 * Configures and exports the Sequelize instance used to connect to the SQLite database. 
 * The Sequelize instance is imported into other parts of the application that need to interact with the database.
 */

const { Sequelize } = require("sequelize");

// Set up sqlite database connection
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.db",
    // debugging
    logging: console.log

});

module.exports = sequelize;
