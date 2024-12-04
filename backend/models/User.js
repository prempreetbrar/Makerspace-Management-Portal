/**
 * Defines the User model representing the User table in the database.
 */
const sequelize = require('../config/database');
const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');

const ADMIN = 'admin';
const PREMIUM = 'premium';
const BASIC = 'basic';

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING(320),
            primaryKey: true,
            allowNull: false,
            validator: {
                isEmail: true,
            },
        },
        firstName: {
            type: DataTypes.STRING(30),
            defaultValue: '',
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: false,
        },
        userRole: {
            //, Premium, Basic
            type: DataTypes.STRING(15),
            defaultValue: BASIC,
            allowNull: false,
            validator: {
                isIn: [ADMIN, PREMIUM, BASIC], // Making this an enum field
            },
        },
        password: {
            // fixed-length 64-byte or 256-bit hash, using SHA256 algo
            // could add salts later, but probably overkill for a demo project
            type: DataTypes.CHAR(64), // 256-bit binary string
            allowNull: false,
        },
        confirmPassword: {
            type: DataTypes.CHAR(64),
            validate: {
                matchesPassword(value) {
                    if (value !== this.password) {
                        throw new Error(
                            'Please make sure your passwords match',
                            401
                        );
                    }
                },
            },
        },
    },
    {
        tableName: 'User',
        timestamps: false,

        /*
      We don't want to be returning the password through queries unless needed in specific
      cases (like checking login or authentication). In those cases, we'll manually override this.
      Why? Returning passwords from a query (even hashed) is a security risk.
    */
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    }
);

User.ADMIN = ADMIN;
User.PREMIUM = PREMIUM;
User.BASIC = BASIC;

/*
    ALL HOOKS (the following section) are applied AFTER any validate functions in the schema.
    For example, User.beforeSave FIRST checks if confirmPassword matches password, BEFORE going
    ahead and hashing it.
  */
User.beforeSave(async (user, options) => {
    if (user.password && user.confirmPassword) {
        user.password = await bcrypt.hash(user.password, 12);
        // we don't want this returned back to the user in the HTTP response
        user.confirmPassword = undefined;
    }
});

User.prototype.isPasswordCorrect = async function (
    givenPassword,
    actualPassword
) {
    return await bcrypt.compare(givenPassword, actualPassword);
};

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
User.associate = (models) => {
    User.hasMany(models.Request, {
        foreignKey: 'userEmail',
        as: 'requests',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    User.hasMany(models.Booking, {
        foreignKey: 'userEmail', // foreign key in booking
        sourceKey: 'email', // primary key in user
        as: 'bookings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports = User;
