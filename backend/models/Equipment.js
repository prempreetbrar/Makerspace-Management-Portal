const {DataTypes}  = require('sequelize');
module.exports = (sequelize) => {
    const Equipment = sequelize.define('Equipment', {
        id: 
        {
          type: DataTypes.INTEGER,
          defaultValue: DataTypes.INTEGER(),
          autoIncrement: true,
          primaryKey: true,
        },
        name: 
        {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description:
        {
            type: DataTypes.TEXT,
            defaultValue:'',
        },
        icon:
        {
            type: DataTypes.BLOB, //image asset
            defaultValue: '',
        },
        equipmentStatus:
        {
            type: DataTypes.STRING(20),
        },
        isBookable:
        {
            // if false, users need to submit a special request
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        isPremium:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'Equipment',
    });
    return Equipment;
};
