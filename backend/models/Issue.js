const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Issue = sequelize.define(
    "Issue",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      equipmentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      dateSubmitted: {
        type: DataTypes.DATE,
      },
      issueStatus: {
        type: DataTypes.BOOLEAN, // resolved or not resolved
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "Issue",
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
  Issue.associate = (models) => {
    Issue.belongsTo(models.Equipment, {
      foreignKey: "equipmentID",
      as: "Equipment",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Issue;
};
