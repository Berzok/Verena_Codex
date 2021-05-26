const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('talent_bonus', {
        id_talent_bonus: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true
        },
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talent',
                key: 'id_talent'
            }
        },
        capacite_combat: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        capacite_tir: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        force: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        endurance: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        agilite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        force_mentale: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        sociabilite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        attaques: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        blessures: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        mouvement: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        magie: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        fortune: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        destin: {
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
        tableName: 'talent_bonus',
        timestamps: false,
        indexes: [
            {
                name: "sqlite_autoindex_talent_bonus_1",
                unique: true,
                fields: [
                    {name: "id_talent_bonus"},
                ]
            },
        ]
    });
};
