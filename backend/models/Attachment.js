const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      requestID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // relative path to file in a designated directory.
      file: {
        type: DataTypes.BLOB, // any sort of file asset
        defaultValue: '',
        allowNull: false,
      },
    },
    {
      tableName: 'Attachment',
      timestamps: false,
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

  Attachment.associate = (models) => {
    Attachment.belongsTo(models.Request, {
      foreignKey: 'requestID',
      as: 'Request',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Attachment;
};
