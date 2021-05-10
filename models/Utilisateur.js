const Sequelize = require('sequelize');
var _role = require("./Role");

module.exports = function (sequelize, DataTypes) {

    var Role = _role(sequelize, DataTypes);

    const Utilisateur = sequelize.define('utilisateur', {
        id_utilisateur: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_role: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'role',
                key: 'id_role'
            }
        },
        nom: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
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
        tableName: 'utilisateur',
        timestamps: false
    });


    /**
     * Vérifie si l'utilisateur a la permission de créer des entités
     * @param id_utilisateur
     * @returns {Promise<boolean>}
     */
    Utilisateur.canCreate = async function(id_utilisateur){
        try{
            if(id_utilisateur){
                return !!await Utilisateur.findByPk(id_utilisateur, {
                    where: {
                        can_create: 1,
                        deleted: 0
                    },
                    include: {
                        model: Role,
                        as: 'id_role_role',
                        required: true
                    }
                });
            }
            return false;
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Utilisateur.canUpdate = async function(id_utilisateur){
        try{
            if(id_utilisateur){
                return !!await Utilisateur.findByPk(id_utilisateur, {
                    where: {
                        can_update: 1,
                        deleted: 0
                    },
                    include: {
                        model: Role,
                        as: 'id_role_role',
                        required: true
                    }
                });
            } else{
                return false;
            }
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Utilisateur.canDelete = async function(id_talent){
        try{
            if(id_talent){
                return !!await Utilisateur.findByPk(id_talent, {
                    where: {
                        can_delete: 1,
                        deleted: 0
                    },
                    include: {
                        model: Role,
                        as: 'id_role_role',
                        required: true
                    }
                });
            }
            return false;
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Utilisateur.checkCredentials = async function(login, password){
        try{
            let data = {};
            if(login && password){
                let user = await Utilisateur.findOne({
                    where: {
                        login: login,
                        password: password,
                        deleted: 0,
                    },
                });
                data.id_utilisateur = user.id_utilisateur;
                data.nom = user.nom;
                data.picture = user.image;
                data.permissions = await Utilisateur.getPermissions(user.id_utilisateur);
                return data;
            }
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Utilisateur.getPermissions = async function(id_utilisateur){
        try{
            let data = {};
            if(id_utilisateur){
                data.canCreate = await Utilisateur.canCreate(id_utilisateur);
                data.canUpdate = await Utilisateur.canUpdate(id_utilisateur);
                data.canDelete = await Utilisateur.canDelete(id_utilisateur);
                return data;
            }
        } catch(error){
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return Utilisateur;
};
