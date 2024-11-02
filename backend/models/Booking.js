const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      userEmail: {
        type: DataTypes.STRING(320),
      },
      equipmentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      bookingDuration: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "Booking",
    }
  );

  /*
    Sequelize only needs Model.belongsTo. The reason we've defined it inside of a method
    is because we can call this method after all models have been loaded in the code. If we put
    this code outside of a method, Sequelize tries to create the association as it's defining the method,
    leading to circular reference issues where

    Model A tries to import B
    Model B tries to import A

    even though neither have been fully defined in the code.

    The name .associate is random, it could be anything. It's just a method we call. 
  */
  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: "userEmail",
      as: "User",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Booking.belongsTo(models.Equipment, {
      foreignKey: "equipmentID",
      as: "Equipment",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Booking;
};
