const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('role', {
        id_role: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        can_create: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        can_update: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        can_delete: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'role',
        timestamps: false
    });
};
