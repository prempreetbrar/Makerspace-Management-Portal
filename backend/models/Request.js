const {DataTypes} = require('sequelize');
const EquipmentModel = require('./Equipment');
const UserModel = require('./User');
module.exports = (sequelize) => {
    const Request = sequelize.define('Request', {
        id: 
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userEmail:
        {
            // foreign key
            type: DataTypes.STRING(320),
            validate:
            {
                isEmail: true,
            }
        },
        description:
        {
            type: DataTypes.TEXT,
            defaultValue:'',
        },
        status:
        {
            type: DataTypes.STRING(10),
            defaultValue:'pending',
            optional
        },
    },
    {
        tableName: 'Requests',
    });
    return Request;
};