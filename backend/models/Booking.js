const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
        id: 
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userEmail:
        {
            type: DataTypes.STRING(320),
        },
        equipmentID:
        {
            type: DataTypes.UUID,
            allowNull: false,
        },
        bookingDateTime:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        bookingDuration:
        {
            type: DataTypes.TIME,
            allowNull: false,
        }
    },
    {
        tableName: 'Bookings',
    });
    return Booking;
};
