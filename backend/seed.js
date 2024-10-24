/**
 * Populates the database with test data.
 * When a new model is created, import it under the 'Import models' comment,
 * then add a new conditional in the seedDatabase arrow function under 
 * the 'Add test data to tables' comment.
 */

const sequelize = require("./config/database");
const UserModel = require("./models/User").default;

// Import models
const User = UserModel(sequelize);

// Sync the database and seed data
// Set the clear = true to erase existing data from your database

const seedDatabase = async (clear = false) => {
    try {
        if (clear) {
            // Clear existing data
            await sequelize.sync({force: true});
        } 
        else {
            // Create tables if they don't exist
            await sequelize.sync();
        }

        // Add test data to tables
        const userCount = await User.count();
        if (userCount === 0) {
            await User.bulkCreate([
                {username: "Conner", birthday: "1997-09-07"},
                {username: "Sid the Kid", birthday: "1989-08-07"},
                {username: "AM34", birthday: "1998-03-04"},
            ]);
            console.log("Seeded user table");
        } 
    } 
    catch (error) {
        console.error("Error seeding database:", error);
    }
};

module.exports = seedDatabase;
