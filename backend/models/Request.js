const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Request = sequelize.define(
  'Request',
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    // foreign key
    userEmail: {
      type: DataTypes.STRING(320),
      validate: {
        isEmail: true,
      },
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'pending',
      validator: {
        oneOf: ['approved', 'denied', 'pending'],
      },
    },
    // foreign key
    equipmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Request',
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
Request.associate = (models) => {
  Request.belongsTo(models.User, {
    foreignKey: 'userEmail',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Request.belongsTo(models.Equipment, {
    foreignKey: 'equipmentID',
    as: 'equipment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Request.hasMany(models.Attachment, {
    foreignKey: 'requestID',
    as: 'attachments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

module.exports = Request;
