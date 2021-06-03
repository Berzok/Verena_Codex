const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _talent = require('./Talent');
const _talent_specialisation = require('./Talent_specialisation');

module.exports = function (sequelize, DataTypes) {

    var Talent = _talent(sequelize, DataTypes);
    var Talent_specialisation = _talent_specialisation(sequelize, DataTypes);

    const Carriere_talent = sequelize.define('Carriere_talent', {
        id_carriere_talent: {
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
        id_talent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'talent',
                key: 'id_talent'
            }
        },
        id_talent_specialisation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talent_specialisation',
                key: 'id_talent_specialisation'
            }
        },
        id_talent_exclu: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talent',
                key: 'id_talent'
            }
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere_talent',
        timestamps: false
    });


    Carriere_talent.belongsTo(Talent, {
        as: "talent",
        foreignKey: "id_talent"
    });
    Carriere_talent.belongsTo(Talent, {
        as: "talent_exclu",
        foreignKey: "id_talent_exclu"
    });
    Carriere_talent.belongsTo(Talent_specialisation, {
        as: "talent_specialisation",
        foreignKey: "id_talent_specialisation"
    });
    Talent.hasMany(Carriere_talent, {
        as: "id_talent_carriere_talents",
        foreignKey: "id_talent"
    });
    Talent.hasMany(Carriere_talent, {
        as: "carriere_talents",
        foreignKey: "id_talent_exclu"
    });
    Talent_specialisation.hasMany(Carriere_talent, {
        as: "carriere_talents",
        foreignKey: "id_talent_specialisation"
    });


    Carriere_talent.createCarriere_talent = async function (params) {
        try {
            return await Carriere_talent.create(params);
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Carriere_talent.getTalentsbyCarriere = async function (id_carriere) {
        try {
            let data = '{}';
            if (id_carriere) {

                let data = await Carriere_talent.findAll({
                    attributes: [
                        'id_carriere_talent',
                        'id_carriere',
                        'id_talent',
                        'id_talent_specialisation',
                        'id_talent_exclu',
                        [sequelize.col('talent.nom'), 'nom_talent'],
                        [sequelize.col('talent_specialisation.nom'), 'nom_specialisation'],
                        [sequelize.col('talent_exclu.nom'), 'nom_talent_exclu']
                    ],
                    where: {
                        id_carriere: id_carriere,
                        deleted: 0
                    },
                    include: [
                        {
                            attributes: [],
                            model: Talent,
                            as: 'talent',
                            required: false,
                            where: {
                                id_talent: {[Op.col]: 'Carriere_talent.id_talent'}
                            }
                        },
                        {
                            attributes: [],
                            model: Talent_specialisation,
                            as: 'talent_specialisation',
                            required: false,
                            where: {
                                id_talent: {[Op.col]: 'Carriere_talent.id_talent_specialisation'}
                            }
                        },
                        {
                            attributes: [],
                            model: Talent,
                            as: 'talent_exclu',
                            required: false,
                            omitNull: true,
                            where: {
                                id_talent: {[Op.col]: 'Carriere_talent.id_talent_exclu'}
                            }
                        }
                    ]
                });
                //data = await Talent.getTalent(ct.id_talent);
                return data ? data : null;
            }
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    return Carriere_talent;
};
