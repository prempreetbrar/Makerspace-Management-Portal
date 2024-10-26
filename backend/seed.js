/**
 * Populates the database with test data.
 * When a new model is created, import it under the 'Import models' comment,
 * then add a new conditional in the seedDatabase arrow function under 
 * the 'Add test data to tables' comment.
 */

const sequelize = require("./config/database");
const UserModel = require("./models/User");

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
                {email: "real_email1@email.com", firstName: "Conner", lastName: "McDavid", userRole: "Premium", password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"},
                {email: "real_email2@email.com", firstName: "Sidney", lastName: "Crosby", userRole: "Basic", password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"},
                {email: "real_email3@email.com", firstName: "Austin", lastName: "Matthews", userRole: "Premium", password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"},
            ]);
            console.log("Seeded user table");
        } 
    } 
    catch (error) {
        console.error("Error seeding database:", error);
    }
};

module.exports = seedDatabase;
