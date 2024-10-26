const {DataTypes} = require('sequelize');
const Equipment = require('./Equipment');
const User = require('./User');
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
            validator:
            {
                oneOf: ['approved', 'denied', 'pending'],
            }
        },
    },
    {
        tableName: 'Requests',
    });
    User.hasMany(Request)
    Request.belongsTo(User);
    return Request;
};