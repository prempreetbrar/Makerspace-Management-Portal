const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Equipment = sequelize.define(
    "Equipment",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      icon: {
        type: DataTypes.BLOB, //image asset
        defaultValue: "",
      },
      equipmentStatus: {
        type: DataTypes.STRING(20),
      },
      isBookable: {
        // if false, users need to submit a special request
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Equipment",
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
  Equipment.associate = (models) => {
    Equipment.hasMany(models.Booking, {
      foreignKey: "equipmentID",
      as: "Bookings",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Equipment.hasMany(models.Request, {
      foreignKey: "equipmentID",
      as: "Requests",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Equipment.hasMany(models.Issue, {
      foreignKey: "equipmentID",
      as: "Issues",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Equipment;
};
