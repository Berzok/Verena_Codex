const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var _carriere_acces = require("./Carriere_acces");
var _carriere_competence = require("./Carriere_competence");
var _carriere_dotation = require("./Carriere_dotation");
var _carriere_plan = require("./Carriere_plan");
var _carriere_sortie = require("./Carriere_sortie");
var _carriere_talent = require("./Carriere_talent");

module.exports = function (sequelize, DataTypes) {

    var Carriere_talent = _carriere_talent(sequelize, DataTypes);

    const Carriere = sequelize.define('Carriere', {
        id_carriere: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        basique: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'carriere',
        timestamps: false
    });

    /**
     * Récupère une carrière à l'aide de son id
     * @param id_carriere
     * @returns {Promise<boolean|*|null>}
     */
    Carriere.getCarriere = async function (id_carriere) {
        try {
            let data = '{}';
            if (id_carriere) {
                data = await Carriere.findByPk(id_carriere, {
                    attributes: ['id_carriere', 'nom', 'description', 'basique', 'image'],
                    where: {
                        deleted: 0
                    }
                });
                data.setDataValue('talents', await Carriere_talent.findAll({
                    attributes: ['id_carriere_talent', 'id_talent', 'id_talent_specialisation', 'id_talent_exclu'],
                    where: {
                        id_carriere: id_carriere,
                        deleted: 0
                    }
                }));
                return data ? data : null;
            }
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    /**
     * Créé une nouvelle carrière
     * @param params
     * @returns {Promise<*|boolean>}
     */
    Carriere.createCarriere = async function (params) {
        try {
            return await Carriere.create(params);
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    /**
     * Met à jour les informations d'une carrière existante
     * @param id_carriere
     * @param params
     * @returns {Promise<*|boolean>}
     */
    Carriere.updateCarriere = async function (id_carriere, params) {
        try {
            let carriereToUpdate = await this.getCarriere(id_carriere);

            carriereToUpdate.nom = params.nom;
            carriereToUpdate.description = params.description;
            carriereToUpdate.basique = params.basique;
            carriereToUpdate.image = params.image;

            return await carriereToUpdate.save();
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    /**
     * Récupère toutes les carrières
     * @returns {Promise<*|boolean>}
     */
    Carriere.getAll = async function () {
        try {
            return await Carriere.findAll({
                raw: true,
            });
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    return Carriere;
};
