/**
 * Defines the User model representing the User table in the database.
 */

const DataTypes = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
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
        defaultValue: "",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        defaultValue: "",
        allowNull: false,
      },
      userRole: {
        //, Premium, Basic
        type: DataTypes.STRING(15),
        defaultValue: "Basic",
        allowNull: false,
        validator: {
          isIn: ["Admin", "Premium", "Basic"], // Making this an enum field
        },
      },
      password: {
        // fixed-length 64-byte or 256-bit hash, using SHA256 algo
        // could add salts later, but probably overkill for a demo project
        type: DataTypes.CHAR(64), // 256-bit binary string
        allowNull: false,
        set(value) {
          this.setDataValue(
            "password",
            crypto.createHash("sha256").update(value).digest("hex")
          );
          // automatically hash the password
        },
      },
    },
    {
      tableName: "User",
      // timestamp for creation and updates are automatically added.
    }
  );

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
      foreignKey: "userEmail",
      as: "Requests",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Booking, {
      foreignKey: "userEmail",
      as: "Bookings",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
