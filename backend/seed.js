/**
 * Populates the database with test data.
 * When a new model is created, import it under the 'Import models' comment,
 * then add a new conditional in the seedDatabase arrow function under
 * the 'Add test data to tables' comment.
 */

const sequelize = require('./config/database');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const Issue = require('./models/Issue');
const Equipment = require('./models/Equipment');
const Booking = require('./models/Booking');
const Request = require('./models/Request');
const Attachment = require('./models/Attachment');
const Models = { User, Issue, Equipment, Booking, Request, Attachment };

// create relationships
User.associate(Models);
Issue.associate(Models);
Equipment.associate(Models);
Booking.associate(Models);
Request.associate(Models);
Attachment.associate(Models);

// Sync the database and seed data
// Set the clear = true to erase existing data from your database
const seedDatabase = async (clear = false) => {
    try {
        if (clear) {
            // Clear existing data
            await sequelize.sync({ force: true, logging: console.log });
        } else {
            // Create tables if they don't exist
            await sequelize.sync();
        }

        // Add test data to tables
        // Users
        const userCount = await User.count();
        if (userCount === 0) {
            await User.bulkCreate(
                [
                    {
                        email: 'sean@gmail.com',
                        firstName: 'Sean',
                        lastName: 'Monaghan',
                        userRole: User.PREMIUM,
                        password: 'monaghan',
                        confirmPassword: 'monaghan',
                    },
                    {
                        email: 'connor@gmail.com',
                        firstName: 'Connor',
                        lastName: 'McDavid',
                        userRole: User.PREMIUM,
                        password: 'connor',
                        confirmPassword: 'connor',
                    },
                    {
                        email: 'sidney@gmail.com',
                        firstName: 'Sidney',
                        lastName: 'Crosby',
                        userRole: User.BASIC,
                        password: 'sidney',
                        confirmPassword: 'sidney', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        email: 'admin@gmail.com',
                        firstName: 'admin',
                        lastName: 'admin',
                        userRole: User.ADMIN,
                        password: 'admin',
                        confirmPassword: 'admin', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                ],
                { individualHooks: true }
            );
            console.log('Seeded user table');
        }

        // Equipment
        const equipmentCount = await Equipment.count();
        if (equipmentCount === 0) {
            await Equipment.bulkCreate(
                [
                    {
                        id: 1,
                        name: '3D Printer',
                        description:
                            'This machine prints things in three dimensions!',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons',
                                '3d_printer.png'
                            )
                        ),
                        isUnderMaintenance: true,
                        isBookable: true,
                        isPremium: false,
                    },
                    {
                        id: 2,
                        name: 'Stapler',
                        description: 'Staples stuff',
                        icon: fs.readFileSync(
                            path.join(__dirname, '/assets/icons', 'stapler.png')
                        ),
                        isUnderMaintenance: false,
                        isBookable: false,
                        isPremium: false,
                    },
                ],
                { individualHooks: true }
            );
            console.log('Seeded equipment table');
        }

        // Issues (with relationships to Equipment by ID)
        const issueCount = await Issue.count();
        if (issueCount === 0) {
            await Issue.bulkCreate([
                {
                    id: 1,
                    equipmentID: 1, // Relates to the 3D Printer
                    description: '3D printer nozzle clogged',
                    isResolved: false,
                },
                {
                    id: 2,
                    equipmentID: 2, // Relates to the Stapler
                    description: 'Stapler out of staples',
                    isResolved: true,
                },
            ]);
            console.log('Seeded issue table');
        }

        // Bookings (with relationships to Equipment and User by ID)
        const bookingCount = await Booking.count();
        if (bookingCount === 0) {
            await Booking.bulkCreate([
                {
                    id: 1,
                    userEmail: 'connor@gmail.com', // Relates to Connor McDavid
                    equipmentID: 1, // Relates to the 3D Printer
                    bookingDate: new Date(),
                    timeSlot1: '12:00:00',
                    title: 'Need the 3D Printer',
                    description:
                        'I want to use the 3D printer to print out a ring for my wife Lauren.',
                },
                {
                    id: 2,
                    userEmail: 'connor@gmail.com', // Relates to Connor McDavid
                    equipmentID: 1, // Relates to the 3D Printer
                    bookingDate: new Date(
                        new Date().setDate(new Date().getDate() + 1)
                    ), // tomorrow
                    timeSlot1: '14:00:00',
                    title: 'Need the 3D Printer AGAIN',
                    description:
                        'I want to use the 3D printer to print out a necklace for my wife Lauren.',
                    status: Booking.STATUS_APPROVED,
                },
            ]);
            console.log('Seeded booking table');
        }

        // Requests (with relationships to Users by email)
        const requestCount = await Request.count();
        if (requestCount === 0) {
            await Request.bulkCreate([
                {
                    id: 1,
                    userEmail: 'connor@gmail.com', // Relates to Connor McDavid
                    equipmentID: 1,
                    title: '3D Printing Request',
                    description: "I'd like to use the 3D printer",
                    status: Booking.STATUS_APPROVED,
                },
                {
                    id: 2,
                    userEmail: 'admin@gmail.com', // Relates to Austin Matthews
                    equipmentID: 2,
                    title: 'Let me use the stapler',
                    description: "I'd like to use the stapler",
                    status: Booking.STATUS_PENDING,
                },
            ]);
            console.log('Seeded request table');
        }

        // Attachments (with relationships to Requests by ID)
        const attachmentCount = await Attachment.count();
        if (attachmentCount === 0) {
            await Attachment.bulkCreate([
                {
                    id: 1,
                    requestID: 1, // Relates to the first request
                    file: fs.readFileSync(
                        path.join(
                            __dirname,
                            '/assets/attachments',
                            '3d_printer_manual.pdf'
                        )
                    ),
                },
                {
                    id: 2,
                    requestID: 2, // Relates to the second request
                    file: fs.readFileSync(
                        path.join(
                            __dirname,
                            '/assets/attachments',
                            'stapler.jpg'
                        )
                    ),
                },
            ]);
            console.log('Seeded attachment table');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;
