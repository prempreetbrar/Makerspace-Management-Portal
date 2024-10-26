/**
 * Defines the User model representing the User table in the database. 
 */

const DataTypes = require('sequelize');
const crypto  = require('crypto');
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: 
        {
            type: DataTypes.STRING(320),
            primaryKey: true,
            allowNull: false,
            validator:
            {
                isEmail: true,
            },
        },
        firstName:
        {
            type: DataTypes.STRING(30),
            defaultValue: '',
            allowNull: false,
        },
        lastName:
        {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: false,
        },
        userRole:
        {
            //, Premium, Basic
            type: DataTypes.STRING(15), 
            defaultValue: 'Basic',
            allowNull: false,
            validator:
            {
                isIn: ['Admin','Premium','Basic'], // Making this an enum field
            }
        },
        password:
        {
            // fixed-length 64-byte or 256-bit hash, using SHA256 algo
            // could add salts later, but probably overkill for a demo project
            type: DataTypes.CHAR(64), // 256-bit binary string
            allowNull: false,
            set(value)
            {
                this.setDataValue('password',crypto.createHash('sha256').update(value).digest('hex'));
                // automatically hash the password
            },
        },
    },
    {
        tableName: 'Users',
        // timestamp for creation and updates are automatically added.
    });

    return User;
};
