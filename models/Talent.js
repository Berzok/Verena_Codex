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

    TalentModel.getTalent = async function(id_talent){
        try{
            let data = '{}';
            if(id_talent){
                data = await TalentModel.findByPk(id_talent);
                return data ? data : null;
            }
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.createTalent = async function(params){
        try{
            return await TalentModel.create(params);
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.deleteTalent = async function(id_talent){
        try{
            let talentToDelete = await this.getTalent(id_talent);
            return await talentToDelete.destroy();
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.updateTalent = async function(id_talent, params){
        try{
            let talentToUpdate = await this.getTalent(id_talent);

            talentToUpdate.nom = params.nom;
            talentToUpdate.description = params.description;
            talentToUpdate.effet = params.effet;

            return await talentToUpdate.save();
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    TalentModel.getAll = async function () {
        try{
            return await TalentModel.findAll({raw: true});
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return TalentModel;
};
