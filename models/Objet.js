const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Objet = sequelize.define('Objet', {
        id_objet: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_disponibilite_defaut: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'disponibilite',
                key: 'id_disponibilite'
            }
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prix: {
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
        tableName: 'objet',
        timestamps: false
    });

    return Objet;
};
