const {DataTypes, INTEGER} = require('sequelize');

module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
        id: 
        {
          type: DataTypes.INTEGER,
          defaultValue: DataTypes.INTEGER(),
          autoIncrement: true,
          primaryKey: true,
        },
        userEmail:
        {
            type: DataTypes.STRING(320),
        },
        equipmentID:
        {
            type: DataTypes.INTEGER,
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
