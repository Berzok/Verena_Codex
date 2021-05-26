const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Qualite = sequelize.define('Qualite', {
        id_qualite: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        multiplicateur_cout: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        modificateur_disponibilite: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'qualite',
        timestamps: false
    });

    return Qualite;
};
