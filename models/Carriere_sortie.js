const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_sortie = sequelize.define('Carriere_sortie', {
        id_carriere_sortie: {
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
        id_carriere_de_sortie: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        tableName: 'carriere_sortie',
        timestamps: false
    });

    return Carriere_sortie;
};
