var DataTypes = require("sequelize").DataTypes;
var _carriere = require("./Carriere");
var _carriere_acces = require("./Carriere_acces");
var _carriere_competence = require("./Carriere_competence");
var _carriere_dotation = require("./Carriere_dotation");
var _carriere_plan = require("./Carriere_plan");
var _carriere_sortie = require("./Carriere_sortie");
var _carriere_talent = require("./Carriere_talent");
var _competence = require("./Competence");
var _competence_specialisation = require("./Competence_specialisation");
var _disponibilite = require("./Disponibilite");
var _don_du_sang = require("./Don_du_sang");
var _objet = require("./Objet");
var _qualite = require("./Qualite");
var _role = require("./Role");
var _talent = require("./Talent");
var _talent_bonus = require("./Talent_bonus");
var _talent_specialisation = require("./Talent_specialisation");
var _utilisateur = require("./Utilisateur");

function initModels(sequelize) {
    var Carriere = _carriere(sequelize, DataTypes);
    var Carriere_acces = _carriere_acces(sequelize, DataTypes);
    var Carriere_competence = _carriere_competence(sequelize, DataTypes);
    var Carriere_dotation = _carriere_dotation(sequelize, DataTypes);
    var Carriere_plan = _carriere_plan(sequelize, DataTypes);
    var Carriere_sortie = _carriere_sortie(sequelize, DataTypes);
    var Carriere_talent = _carriere_talent(sequelize, DataTypes);
    var Competence = _competence(sequelize, DataTypes);
    var Competence_specialisation = _competence_specialisation(sequelize, DataTypes);
    var Disponibilite = _disponibilite(sequelize, DataTypes);
    var Don_du_sang = _don_du_sang(sequelize, DataTypes);
    var Objet = _objet(sequelize, DataTypes);
    var Qualite = _qualite(sequelize, DataTypes);
    var Role = _role(sequelize, DataTypes);
    var Talent = _talent(sequelize, DataTypes);
    var Talent_bonus = _talent_bonus(sequelize, DataTypes);
    var Talent_specialisation = _talent_specialisation(sequelize, DataTypes);
    var Utilisateur = _utilisateur(sequelize, DataTypes);

    Carriere.hasMany(Carriere_acces, {
        as: "carriere_acces",
        foreignKey: "id_carriere_pour_acces"
    });
    Carriere.hasMany(Carriere_acces, {
        as: "id_carriere_carriere_acces",
        foreignKey: "id_carriere"
    });
    Carriere.hasMany(Carriere_competence, {
        as: "carriere_competences",
        foreignKey: "id_carriere"
    });
    Carriere.hasMany(Carriere_plan, {
        as: "carriere_plans",
        foreignKey: "id_carriere"
    });
    Carriere.hasMany(Carriere_dotation, {
        as: "carriere_dotations",
        foreignKey: "id_carriere"
    });
    Carriere.hasMany(Carriere_sortie, {
        as: "carriere_sorties",
        foreignKey: "id_carriere_de_sortie"
    });
    Carriere.hasMany(Carriere_talent, {
        as: "carriere_talents",
        foreignKey: "id_carriere"
    });
    Carriere.hasMany(Carriere_sortie, {
        as: "id_carriere_carriere_sorties",
        foreignKey: "id_carriere"
    });

    Carriere_acces.belongsTo(Carriere, {
        as: "id_carriere_pour_acces_carriere",
        foreignKey: "id_carriere_pour_acces"
    });
    Carriere_acces.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });

    Carriere_competence.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });
    Carriere_competence.belongsTo(Competence, {
        as: "id_competence_exclue_competence",
        foreignKey: "id_competence_exclue"
    });
    Carriere_competence.belongsTo(Competence, {
        as: "id_competence_competence",
        foreignKey: "id_competence"
    });
    Carriere_competence.belongsTo(Competence_specialisation, {
        as: "id_competence_specialisation_competence_specialisation",
        foreignKey: "id_competence_specialisation"
    });

    Carriere_dotation.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });
    Carriere_dotation.belongsTo(Objet, {
        as: "id_objet_objet",
        foreignKey: "id_objet"
    });
    Carriere_dotation.belongsTo(Qualite, {
        as: "id_qualite_qualite",
        foreignKey: "id_qualite"
    });

    Carriere_plan.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });

    Carriere_sortie.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });
    Carriere_sortie.belongsTo(Carriere, {
        as: "id_carriere_de_sortie_carriere",
        foreignKey: "id_carriere_de_sortie"
    });

    Carriere_talent.belongsTo(Carriere, {
        as: "id_carriere_carriere",
        foreignKey: "id_carriere"
    });


    Competence.hasMany(Carriere_competence, {
        as: "carriere_competences",
        foreignKey: "id_competence_exclue"
    });
    Competence.hasMany(Carriere_competence, {
        as: "id_competence_carriere_competences",
        foreignKey: "id_competence"
    });
    Competence.hasMany(Competence_specialisation, {
        as: "competence_specialisations",
        foreignKey: "id_competence"
    });

    Competence_specialisation.belongsTo(Competence, {
        as: "id_competence_competence",
        foreignKey: "id_competence"
    });
    Competence_specialisation.hasMany(Carriere_competence, {
        as: "carriere_competences",
        foreignKey: "id_competence_specialisation"
    });

    Disponibilite.hasMany(Objet, {
        as: "objet",
        foreignKey: "id_disponibilite_defaut"
    });

    Objet.belongsTo(Disponibilite, {
        as: "id_disponibilite_defaut_disponibilite",
        foreignKey: "id_disponibilite"
    });
    Objet.hasMany(Carriere_dotation, {
        as: "carriere_dotations",
        foreignKey: "id_objet"
    });

    Qualite.hasMany(Carriere_dotation, {
        as: "carriere_dotations",
        foreignKey: "id_qualite"
    });


    Talent.hasMany(Talent_bonus, {
        as: "talent_bonus",
        foreignKey: "id_talent"
    });
    Talent.hasMany(Talent_specialisation, {
        as: "talent_specialisations",
        foreignKey: "id_talent"
    });

    Talent_bonus.belongsTo(Talent, {
        as: "id_talent_talent",
        foreignKey: "id_talent"
    });

    Talent_specialisation.belongsTo(Talent, {
        as: "id_talent_talent",
        foreignKey: "id_talent"
    });

    Role.hasMany(Utilisateur, {
        as: "utilisateurs",
        foreignKey: "id_role"
    });

    Utilisateur.belongsTo(Role, {
        as: "id_role_role",
        foreignKey: "id_role"
    });

    return {
        Carriere,
        Carriere_acces,
        Carriere_competence,
        Carriere_dotation,
        Carriere_plan,
        Carriere_sortie,
        Carriere_talent,
        Competence,
        Competence_specialisation,
        Disponibilite,
        Don_du_sang,
        Objet,
        Qualite,
        Role,
        Talent,
        Talent_bonus,
        Talent_specialisation,
        Utilisateur,
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
