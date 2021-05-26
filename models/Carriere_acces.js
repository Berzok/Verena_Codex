const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_acces = sequelize.define('Carriere_acces', {
        id_carriere_acces: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_carriere: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carriere',
                key: 'id_carriere'
            }
        },
        id_carriere_pour_acces: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carriere',
                key: 'id_carriere'
            }
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere_acces',
        timestamps: false
    });

    return Carriere_acces;
};
