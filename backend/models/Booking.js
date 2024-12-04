const { DataTypes, INTEGER, Op } = require('sequelize');
const sequelize = require('../config/database');

// status constants
STATUS_APPROVED = 'approved';
STATUS_DENIED = 'denied';
STATUS_PENDING = 'pending';

const Booking = sequelize.define(
    'Booking',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userEmail: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
        equipmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        timeSlot1: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        timeSlot2: {
            type: DataTypes.TIME,
        },
        status: {
            type: DataTypes.STRING(10),
            defaultValue: STATUS_PENDING,
            validator: {
                oneOf: [STATUS_APPROVED, STATUS_DENIED, STATUS_PENDING],
            },
        },
        adminComments: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: 'Booking',
        timestamps: false,
        // we can't let users book two bookings on the same day (even if premium)
        indexes: [
            {
                unique: true,
                fields: ['userEmail', 'equipmentID', 'bookingDate'],
            },
        ],
    }
);

Booking.STATUS_APPROVED = STATUS_APPROVED;
Booking.STATUS_DENIED = STATUS_DENIED;
Booking.STATUS_PENDING = STATUS_PENDING;

Booking.allTimeSlots = [
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
];
// CHANGE MAX DAYS IN ADVANCE
Booking.premiumUserMaxDaysInFuture = 28;
Booking.basicUserMaxDaysInFuture = 14;

// force the status to 'pending' during creation, users shouldn't try anything funny
Booking.beforeCreate((booking, options) => {
    booking.status = Booking.STATUS_PENDING;
});

// booking validity validation
Booking.addHook('beforeValidate', async (booking) => {
    const User = sequelize.models.User;
    const Equipment = sequelize.models.Equipment;
    console.log(booking.equipmentID);
    const user = await User.findByPk(booking.userEmail);
    const equipment = await Equipment.findByPk(booking.equipmentID);

    if (!user) throw new Error('User not found');
    if (!equipment) throw new Error('Equipment not found');

    // 1. Validate Equipment Booking Availability
    if (!equipment.isBookable) {
        throw new Error(
            'Booking cannot be created. The equipment is not bookable.'
        );
    }

    // 2. Validate Premium Equipment Booking
    if (equipment.isPremium && user.userRole !== User.PREMIUM) {
        throw new Error('Only premium users can book premium equipment.');
    }

    // 3. Validate Time Slot Requirements
    if (user.userRole !== User.PREMIUM && booking.timeSlot2) {
        throw new Error('Basic users can only book one time slot.');
    }

    // 4. Ensure No Conflicting Booking
    const conflictConditions = [
        { timeSlot1: booking.timeSlot1 },
        { timeSlot2: booking.timeSlot1 },
    ];

    if (booking.timeSlot2) {
        conflictConditions.push(
            { timeSlot1: booking.timeSlot2 },
            { timeSlot2: booking.timeSlot2 }
        );
    }

    const conflict = await Booking.findOne({
        where: {
            equipmentID: booking.equipmentID,
            bookingDate: booking.bookingDate,
            [Op.or]: conflictConditions,
        },
    });

    if (conflict) {
        throw new Error(
            'A booking already exists for this equipment on the specified date and time slot.'
        );
    }

    // Check that the bookingDate is within allowed range for the user’s role
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    const bookingDate = new Date(booking.bookingDate);

    if (bookingDate < today) {
        throw new Error('Booking date must be today or a future date.');
    }

    const maxBookingDays =
        user.userRole === User.PREMIUM
            ? Booking.premiumDaysInFuture
            : Booking.regularDaysInFuture;
    const maxBookingDate = new Date(today);
    maxBookingDate.setDate(today.getDate() + maxBookingDays);

    if (bookingDate > maxBookingDate) {
        throw new Error(
            `Bookings can only be made up to ${maxBookingDays} days in advance for your user role.`
        );
    }

    // Ensure time slots are on the hour and within allowed range
    const isOnHourMark = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return minute === 0;
    };

    if (!isOnHourMark(booking.timeSlot1)) {
        throw new Error('timeSlot1 must be on the hour (e.g., 7:00, 8:00).');
    }
    if (booking.timeSlot2 && !isOnHourMark(booking.timeSlot2)) {
        throw new Error('timeSlot2 must be on the hour (e.g., 7:00, 8:00).');
    }

    // Define allowed time range
    const earliestTime = '08:00:00';
    const latestTime = '19:00:00';

    if (booking.timeSlot1 < earliestTime || booking.timeSlot1 > latestTime) {
        throw new Error('timeSlot1 must be between 08:00 AM and 07:00 PM.');
    }
    if (
        booking.timeSlot2 &&
        (booking.timeSlot2 < earliestTime || booking.timeSlot2 > latestTime)
    ) {
        throw new Error('timeSlot2 must be between 08:00 AM and 07:00 PM.');
    }

    if (booking.timeSlot2 && booking.timeSlot1 >= booking.timeSlot2) {
        throw new Error('timeSlot1 must be earlier than timeSlot2.');
    }
});

// status validation
Booking.addHook('beforeValidate', (booking) => {
    if (booking.adminComments && booking.status !== Booking.STATUS_DENIED) {
        throw new Error(
            `Admin comments can only be added to bookings with a status of ${Booking.STATUS_DENIED}.`
        );
    }
});

/*
    Sequelize only needs Model.belongsTo. The reason we've defined it inside of a method
    is because we can call this method after all models have been loaded in the code. If we put
    this code outside of a method, Sequelize tries to create the association as it's invoking the code,
    leading to circular reference issues where

    Model A tries to import B
    Model B tries to import A

    even though neither have been fully defined in the code.

    The name .associate is random, it could be anything. It's just a method we call. 
  */
Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userEmail', // column in Booking model
        targetKey: 'email', // column in User model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Booking.belongsTo(models.Equipment, {
        as: 'equipment',
        foreignKey: 'equipmentID',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports = Booking;
