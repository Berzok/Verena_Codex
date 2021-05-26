const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_plan = sequelize.define('Carriere_plan', {
        id_carriere_plan: {
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
        capacite_combat: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capacite_tir: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        force: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        endurance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        agilite: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        force_mentale: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sociabilite: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        attaque: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        blessure: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mouvement: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        magie: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fortune: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        destin: {
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
        tableName: 'carriere_plan',
        timestamps: false
    });

    return Carriere_plan;
};
