const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Competence_specialisation = sequelize.define('Competence_specialisation', {
        id_competence_specialisation: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_competence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'competence',
                key: 'id_competence'
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
        effet: {
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
        tableName: 'competence_specialisation',
        timestamps: false
    });

    return Competence_specialisation;
};
