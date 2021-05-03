const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const TalentModel = sequelize.define('talent', {
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true
        },
        nom: {
            type: "TEXT(140)",
            allowNull: true
        },
        description: {
            type: "TEXT(990)",
            allowNull: true
        },
        effet: {
            type: "TEXT(990)",
            allowNull: true
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'talent',
        timestamps: false,
        indexes: [
            {
                name: "sqlite_autoindex_talent_1",
                unique: true,
                fields: [
                    {name: "id_talent"},
                ]
            },
        ]
    });

    TalentModel.getAll = async function () {
        try{
            const data = await TalentModel.findAll();
            return data;
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    function aha() {
    }


    return TalentModel;
};
