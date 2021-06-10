const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _talent_specialisation = require('./Talent_specialisation');

module.exports = function (sequelize, DataTypes) {

    var Talent_specialisation = _talent_specialisation(sequelize, DataTypes);

    const Talent = sequelize.define('Talent', {
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
        },
        id_competence_liee: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'competence',
                key: 'id_competence'
            }
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        effet: {
            type: DataTypes.TEXT,
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

    Talent.getTalent = async function (id_talent) {
        try {
            let data = '{}';
            if (id_talent) {
                data = await Talent.findByPk(id_talent, {
                    attributes: ['id_talent', 'nom', 'description', 'effet'],
                    where: {
                        deleted: 0
                    },
                    include: {
                        attributes: ['nom'],
                        model: Talent_specialisation,
                        as: 'talent_specialisations',
                        required: false,
                        where: {
                            id_talent: {[Op.col]: 'Talent.id_talent'}
                        }
                    }
                });
                return data ? data : null;
            }
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.createTalent = async function (params) {
        try {
            return await Talent.create(params);
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.deleteTalent = async function (id_talent) {
        try {
            let talentToDelete = await this.getTalent(id_talent);
            return await talentToDelete.destroy();
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Talent.updateTalent = async function (id_talent, params) {
        try {
            let talentToUpdate = await this.getTalent(id_talent);

            talentToUpdate.nom = params.nom;
            talentToUpdate.description = params.description;
            talentToUpdate.effet = params.effet;

            return await talentToUpdate.save();
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    /**
     *
     * @param {boolean|null} [specialisation=false]
     * @returns {Promise<*|boolean>}
     */
    Talent.getAll = async function (specialisation = false) {
        try {
            if(specialisation){
                return await Talent.findAll({
                    attributes: [
                        'id_talent',
                        'nom'
                    ],
                    include: {
                        attributes: ['id_talent_specialisation', 'nom'],
                        model: Talent_specialisation,
                        as: 'talent_specialisations',
                        required: false,
                        where: {
                            id_talent: {[Op.col]: 'Talent.id_talent'}
                        }
                    }
                })
            } else {
                return await Talent.findAll({
                    raw: true,
                    order: [
                        ['nom', 'ASC']
                    ]
                });
            }
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return Talent;
};
