/**
 * Populates the database with test data.
 * When a new model is created, import it under the 'Import models' comment,
 * then add a new conditional in the seedDatabase arrow function under
 * the 'Add test data to tables' comment.
 */

const sequelize = require("./config/database");
const fs = require("fs");
const path = require("path");
const UserModel = require("./models/User");
const IssueModel = require("./models/Issue");
const EquipmentModel = require("./models/Equipment");
const BookingModel = require("./models/Booking");
const RequestModel = require("./models/Request");

// Import models
const User = UserModel(sequelize);
const Issue = IssueModel(sequelize);
const Equipment = EquipmentModel(sequelize);
const Booking = BookingModel(sequelize);
const Request = RequestModel(sequelize);

// invoke code to define relationships
Object.keys(sequelize.models).forEach((modelName) => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});

// Sync the database and seed data
// Set the clear = true to erase existing data from your database
const seedDatabase = async (clear = true) => {
  try {
    if (clear) {
      // Clear existing data
      await sequelize.sync({ force: true });
    } else {
      // Create tables if they don't exist
      await sequelize.sync();
    }

    // Add test data to tables
    // Users
    const userCount = await User.count();
    if (userCount === 0) {
      await User.bulkCreate([
        {
          email: "real_email1@email.com",
          firstName: "Connor",
          lastName: "McDavid",
          userRole: "Premium",
          password:
            "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // SHA-256 Hash of "password"
        },
        {
          email: "real_email2@email.com",
          firstName: "Sidney",
          lastName: "Crosby",
          userRole: "Basic",
          password:
            "c0e21a8ff85153deac82fe7f09c0da1b3bd90ac0ae204e78d7148753b4363c03", // SHA-256 Hash of "wordpass"
        },
        {
          email: "real_email3@email.com",
          firstName: "Austin",
          lastName: "Matthews",
          userRole: "Admin",
          password:
            "80d1159c872683756864281692bf8ffa330341cae85c8e188a2bf29edd7adbbe", // SHA-256 Hash of "extraSuperStrongP@s$W0Rd!"
        },
      ]);
      console.log("Seeded user table");
    }

    // Equipment
    const equipmentCount = await Equipment.count();
    if (equipmentCount === 0) {
      await Equipment.bulkCreate([
        {
          id: 1,
          name: "3D Printer",
          description: "This machine prints things in three dimensions!",
          icon: fs.readFileSync(
            path.join(__dirname, "icons", "3d_printer.png")
          ),
          equipmentStatus: "good",
          isBookable: true,
          isPremium: true,
        },
        {
          id: 2,
          name: "Stapler",
          description: "Staples stuff",
          icon: fs.readFileSync(path.join(__dirname, "icons", "stapler.png")),
          equipmentStatus: "really good",
          isBookable: false,
          isPremium: false,
        },
      ]);
      console.log("Seeded equipment table");
    }

    // Issues (with relationships to Equipment by ID)
    const issueCount = await Issue.count();
    if (issueCount === 0) {
      await Issue.bulkCreate([
        {
          id: 1,
          equipmentID: 1, // Relates to the 3D Printer
          description: "3D printer nozzle clogged",
          dateSubmitted: new Date(),
          issueStatus: false,
        },
        {
          id: 2,
          equipmentID: 2, // Relates to the Vending Machine
          description: "Vending machine out of snacks",
          dateSubmitted: new Date(),
          issueStatus: true,
        },
      ]);
      console.log("Seeded issue table");
    }

    // Bookings (with relationships to Equipment and User by ID)
    const bookingCount = await Booking.count();
    if (bookingCount === 0) {
      await Booking.bulkCreate([
        {
          id: 1,
          userEmail: "real_email1@email.com", // Relates to Connor McDavid
          equipmentID: 1, // Relates to the 3D Printer
          bookingDateTime: new Date(),
          bookingDuration: 3,
        },
        {
          id: 2,
          userEmail: "real_email2@email.com", // Relates to Sidney Crosby
          equipmentID: 2, // Relates to the Vending Machine
          bookingDateTime: new Date(),
          bookingDuration: 2,
        },
      ]);
      console.log("Seeded booking table");
    }

    // Requests (with relationships to Users by email)
    const requestCount = await Request.count();
    if (requestCount === 0) {
      await Request.bulkCreate([
        {
          id: 1,
          userEmail: "real_email1@email.com", // Relates to Connor McDavid
          description: "Gimme that machine",
          status: "approved",
        },
        {
          id: 2,
          userEmail: "real_email3@email.com", // Relates to Austin Matthews
          description: "I likes it and I wants it",
          status: "pending",
        },
      ]);
      console.log("Seeded request table");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
