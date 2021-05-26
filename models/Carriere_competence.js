const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Carriere_competence = sequelize.define('Carriere_competence', {
        id_carriere_competence: {
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
        id_competence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'competence',
                key: 'id_competence'
            }
        },
        id_competence_specialisation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'competence_specialisation',
                key: 'id_competence_specialisation'
            }
        },
        id_competence_exclue: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'competence',
                key: 'id_competence'
            }
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere_competence',
        timestamps: false
    });

    return Carriere_competence;
};
