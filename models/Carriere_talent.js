const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_talent = sequelize.define('Carriere_talent', {
        id_carriere_talent: {
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
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'talent',
                key: 'id_talent'
            }
        },
        id_talent_specialisation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talent_specialisation',
                key: 'id_talent_specialisation'
            }
        },
        id_talent_exclu: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talent',
                key: 'id_talent'
            }
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere_talent',
        timestamps: false
    });

    return Carriere_talent;
};
