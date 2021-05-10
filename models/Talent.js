const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Talent = sequelize.define('talent', {
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
        },
        nom: {
            type: "TEXT(140)",
            allowNull: true,
        },
        description: {
            type: "TEXT(990)",
            allowNull: true,
        },
        effet: {
            type: "TEXT(990)",
            allowNull: true,
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

    Talent.getTalent = async function(id_talent){
        try{
            let data = '{}';
            if(id_talent){
                data = await Talent.findByPk(id_talent);
                return data ? data : null;
            }
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.createTalent = async function(params){
        try{
            return await Talent.create(params);
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.deleteTalent = async function(id_talent){
        try{
            let talentToDelete = await this.getTalent(id_talent);
            return await talentToDelete.destroy();
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.updateTalent = async function(id_talent, params){
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

    Talent.getAll = async function () {
        try{
            return await Talent.findAll({raw: true});
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return Talent;
};
