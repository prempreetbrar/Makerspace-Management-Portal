const {DataTypes} = require('sequelize');
const Equipment = require('./Equipment');
module.exports = (sequelize) => {
    const User = require('./User')(sequelize);
    const Request = sequelize.define('Request', {
        id: 
        {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.INTEGER(),
            autoIncrement: true,
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
    User.hasMany(Request, { foreignKey: 'userEmail', sourceKey: 'email' });
    Request.belongsTo(User, { foreignKey: 'userEmail', targetKey: 'email' });
    return Request;
};