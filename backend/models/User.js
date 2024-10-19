/**
 * Defines the User model representing the User table in the database. 
 */

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return User;
};
