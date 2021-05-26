const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Disponibilite = sequelize.define('Disponibilite', {
        id_disponibilite: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        difficulte: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'disponibilite',
        timestamps: false
    });

    return Disponibilite;
};
