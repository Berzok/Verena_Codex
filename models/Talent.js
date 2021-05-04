const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const TalentModel = sequelize.define('talent', {
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
            id_talent(_value = null){
                if(_value == null){
                    return this.getDataValue(id_talent);
                } else{
                    this.setDataValue(_value);
                }
            }
        },
        nom: {
            type: "TEXT(140)",
            allowNull: true,
            nom(_value = null){
                if(_value == null){
                    return this.getDataValue(nom);
                } else{
                    this.setDataValue(_value);
                }
            }
        },
        description: {
            type: "TEXT(990)",
            allowNull: true,
            description(_value = null){
                if(_value == null){
                    return this.getDataValue(description);
                } else{
                    this.setDataValue(_value);
                }
            }
        },
        effet: {
            type: "TEXT(990)",
            allowNull: true,
            effet(_value = null){
                if(_value == null){
                    return this.getDataValue(effet);
                } else{
                    this.setDataValue(_value);
                }
            }
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

    TalentModel.createTalent = async function(params){
        try{
            return await TalentModel.create(params);
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.updateTalent = async function(params){
        try{
            return await TalentModel.create(params);
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.getAll = async function () {
        try{
            let data = await TalentModel.findAll({raw: true});
            console.dir(data);
            return data;
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return TalentModel;
};
