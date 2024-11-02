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
      validate: {
        async equipmentIsBookable() {
          const Equipment = sequelize.models.Equipment;
          const equipment = await Equipment.findByPk(this.equipmentID);

          if (!equipment) {
            throw new Error("Equipment not found");
          }

          if (!equipment.isBookable) {
            throw new Error(
              "Booking cannot be created. The equipment is not bookable."
            );
          }
        },
        async userCanBookPremiumEquipment() {
          const Equipment = sequelize.models.Equipment;
          const User = sequelize.models.User;

          const equipment = await Equipment.findByPk(this.equipmentID);
          const user = await User.findByPk(this.userEmail);

          if (!equipment) {
            throw new Error("Equipment not found");
          }
          if (!user) {
            throw new Error("User not found");
          }

          if (equipment.isPremium && user.userRole !== "Premium") {
            throw new Error("Only premium users can book premium equipment.");
          }
        },
      },
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
