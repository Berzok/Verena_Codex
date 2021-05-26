const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_dotation = sequelize.define('Carriere_dotation', {
        id_carriere_dotation: {
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
        id_objet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'objet',
                key: 'id_objet'
            }
        },
        id_qualite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'qualite',
                key: 'id_qualite'
            }
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere_dotation',
        timestamps: false
    });

    return Carriere_dotation;
};
