const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Competence = sequelize.define('Competence', {
        id_competence: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        caracteristique: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        effet: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        basique: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'competence',
        timestamps: false
    });

    return Competence;
};
