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
function printBookingRecord(booking) {
    console.log(`userEmail: ${booking.userEmail}`);
    console.log(`equipmentID: ${booking.equipmentID}`);
    console.log(`title: ${booking.title}`);
    console.log(`description: ${booking.description}`);
    console.log(`bookingDate: ${booking.bookingDate.toLocaleString()}`);
    console.log(`timeSlot1: ${booking.timeSlot1}`);
    console.log(`timeSlot2: ${booking.timeSlot2}`);
    console.log(`status: ${booking.status}`);
    console.log('----------------------------------------');
}

const generatePremiumBookings = (
    equipmentIDs,
    premiumUsers,
    noDays,
    startTime,
    dayOffset
) => {
    const bookings = [];
    const startDay = new Date();
    startDay.setUTCHours(0, 0, 0, 0); // Guarantee that the timestamp is in precise intervals
    console.log(startDay.toDateString());
    startDay.setDate(startDay.getDate() + dayOffset);
    const initalBookingHour = startTime;
    equipmentIDs.forEach((id) => {
        let baseDay = new Date(startDay);
        for (i = 0; i < noDays; ++i) {
            console.log('Start date: %s', baseDay.toLocaleString());
            let bookingHour = initalBookingHour;
            premiumUsers.forEach((email) => {
                console.log(
                    'Booking hours: %d:00:00, %d:00:00',
                    bookingHour,
                    bookingHour + 1
                );
                bookings.push({
                    userEmail: email,
                    equipmentID: id,
                    title: `Booking for ${email} for ${id}`,
                    description: `email: ${email}, equipmentID ${id}`,
                    bookingDate: new Date(baseDay),
                    timeSlot1: `${bookingHour++}:00:00`,
                    timeSlot2: `${bookingHour++}:00:00`,
                    status: Booking.STATUS_APPROVED,
                });
            });
            baseDay.setDate(baseDay.getDate() + 1);
        }
    });
    console.log(
        `Expected ${equipmentIDs.length * noDays * premiumUsers.length} bookings, got ${bookings.length} bookings`
    );
    bookings.forEach((b) => printBookingRecord(b));
    return bookings;
};
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
                        // exposing the password defeats the purpose of hashing, but this is only
                        // done for seeding
                        confirmPassword: 'connor',
                    },
                    {
                        email: 'sidney@gmail.com',
                        firstName: 'Sidney',
                        lastName: 'Crosby',
                        userRole: User.BASIC,
                        password: 'sidney',
                        confirmPassword: 'sidney',
                        // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        email: 'carter.marcelo@ucalgary.ca',
                        firstName: 'Carter',
                        lastName: 'Marcelo',
                        userRole: User.ADMIN,
                        password: '<MyStr)ng_P@ssW()R!D>',
                        confirmPassword: '<MyStr)ng_P@ssW()R!D>', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        email: 'admin@gmail.com',
                        firstName: 'admin',
                        lastName: 'admin',
                        userRole: User.ADMIN,
                        password: 'admin',
                        confirmPassword: 'admin', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        // DO NOT LOG IN AS THIS USER.
                        // IT IS TO ALLOW FOR SEEDING BOOKINGS ONLY
                        email: 'ghostuser1@gmail.com',
                        firstName: 'Ghost',
                        lastName: 'User1',
                        userRole: User.PREMIUM,
                        password: 'xiukaJ!@&$hjcUiph55U',
                        confirmPassword: 'xiukaJ!@&$hjcUiph55U', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        // DO NOT LOG IN AS THIS USER.
                        // IT IS TO ALLOW FOR SEEDING BOOKINGS ONLY
                        email: 'ghostuser2@gmail.com',
                        firstName: 'Ghost',
                        lastName: 'User2',
                        userRole: User.PREMIUM,
                        password: 'uAd8f90&2_90345jDoau7',
                        confirmPassword: 'uAd8f90&2_90345jDoau7', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        // DO NOT LOG IN AS THIS USER.
                        // IT IS TO ALLOW FOR SEEDING BOOKINGS ONLY
                        email: 'ghostuser3@gmail.com',
                        firstName: 'Ghost',
                        lastName: 'User3',
                        userRole: User.PREMIUM,
                        password: 'ghostuser',
                        confirmPassword: 'ghostuser', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        // DO NOT LOG IN AS THIS USER.
                        // IT IS TO ALLOW FOR SEEDING BOOKINGS ONLY
                        email: 'ghostuser4@gmail.com',
                        firstName: 'Ghost',
                        lastName: 'User4',
                        userRole: User.PREMIUM,
                        password: 'ghostuser',
                        confirmPassword: 'ghostuser', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
                    },
                    {
                        // DO NOT LOG IN AS THIS USER.
                        // IT IS TO ALLOW FOR SEEDING BOOKINGS ONLY
                        email: 'ghostuser5@gmail.com',
                        firstName: 'Ghost',
                        lastName: 'User5',
                        userRole: User.PREMIUM,
                        password: 'ghostuser',
                        confirmPassword: 'ghostuser', // only null because Sequelize does not validate passwords match on bulk create (intentional, just how the ORM is implemented)
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
                        id: 0,
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
                        id: 1,
                        name: 'Stapler',
                        description: 'Staples stuff',
                        icon: fs.readFileSync(
                            path.join(__dirname, '/assets/icons', 'stapler.png')
                        ),
                        isUnderMaintenance: false,
                        isBookable: false,
                        isPremium: false,
                    },
                    {
                        id: 2,
                        name: 'Makerbot Replicator +',
                        description:
                            'A state-of-the-art 3D printer that can produce high-quality prints',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'mb_replicator.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: true,
                        isPremium: true,
                    },
                    {
                        id: 3,
                        name: 'CNC Milling Machine',
                        description:
                            'For precise drilling, reshaping and cutting',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'cnc_machine.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: true,
                        isPremium: false,
                    },
                    {
                        id: 4,
                        name: 'Hammer',
                        description: 'A regular claw hammer',
                        icon: fs.readFileSync(
                            path.join(__dirname, '/assets/icons/', 'hammer.png')
                        ),
                        isUnderMaintenance: false,
                        isBookable: false,
                        isPremium: false,
                    },
                    {
                        id: 5,
                        name: 'Drill Press',
                        description:
                            'For tapping screws or drilling into tough materials.',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'drill_press.png'
                            )
                        ),
                        isUnderMaintenance: true,
                        isBookable: true,
                        isPremium: false,
                    },
                    {
                        id: 6,
                        name: 'Raspberry Pi 4',
                        description:
                            'A mini computer with 2GB of RAM and 2 USB Ports. Data will be wiped between users.',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'raspberry_pi.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: false,
                        isPremium: false,
                    },
                    {
                        id: 7,
                        name: 'Small Angle Grinder',
                        description:
                            'For grinding or cutting through metal. We provide PPE for this equipment',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'small_angle_grinder.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: false,
                        isPremium: false,
                    },
                    {
                        id: 8,
                        name: 'Welding kit',
                        description:
                            'Join metal together using heat and electricity',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'toolbox.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: true,
                        isPremium: true,
                    },
                    {
                        id: 9,
                        name: 'Laser Cutter',
                        description:
                            'Uses a powerful laser to precisely cut shapes or intricate designs',
                        icon: fs.readFileSync(
                            path.join(
                                __dirname,
                                '/assets/icons/',
                                'laser_cutter.png'
                            )
                        ),
                        isUnderMaintenance: false,
                        isBookable: true,
                        isPremium: true,
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
            const premiumBookings = generatePremiumBookings(
                [5, 8],
                [
                    'ghostuser1@gmail.com',
                    'ghostuser2@gmail.com',
                    'ghostuser3@gmail.com',
                ],
                14,
                8,
                3
            ); // 14 days worth of seeding
            // starting at 8 for the first user
            // offset the first booking by 3 days
            await Booking.bulkCreate([
                {
                    userEmail: 'connor@gmail.com', // Relates to Connor McDavid
                    equipmentID: 0, // Relates to the 3D Printer
                    bookingDate: new Date(),
                    timeSlot1: '12:00:00',
                    title: 'Need the 3D Printer',
                    description:
                        'I want to use the 3D printer to print out a ring for my wife Lauren.',
                },
                {
                    userEmail: 'connor@gmail.com', // Relates to Connor McDavid
                    equipmentID: 0, // Relates to the 3D Printer
                    bookingDate: new Date(
                        new Date().setDate(new Date().getDate() + 1)
                    ), // tomorrow
                    timeSlot1: '14:00:00',
                    title: 'Need the 3D Printer AGAIN',
                    description:
                        'I want to use the 3D printer to print out a necklace for my wife Lauren.',
                    status: Booking.STATUS_APPROVED,
                },
                ...premiumBookings,
            ]),
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
