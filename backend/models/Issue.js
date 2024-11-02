const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Issue = sequelize.define(
    "Equipment",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      equipmentName: {
        type: DataTypes.STRING(128),
        allowNull: true,
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
      tableName: "Issues",
    }
  );
  return Issue;
};
