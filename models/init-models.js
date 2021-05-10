var DataTypes = require("sequelize").DataTypes;
var _role = require("./Role");
var _talent = require("./Talent");
var _talent_bonus = require("./Talent_bonus");
var _talent_specialisation = require("./Talent_specialisation");
var _utilisateur = require("./Utilisateur");

function initModels(sequelize) {
    var Role = _role(sequelize, DataTypes);
    var Talent = _talent(sequelize, DataTypes);
    var Talent_bonus = _talent_bonus(sequelize, DataTypes);
    var Talent_specialisation = _talent_specialisation(sequelize, DataTypes);
    var Utilisateur = _utilisateur(sequelize, DataTypes);

    Utilisateur.belongsTo(Role, {
        as: "id_role_role",
        foreignKey: "id_role"
    });
    Role.hasMany(Utilisateur, {
        as: "utilisateurs",
        foreignKey: "id_role"
    });

    Talent_bonus.belongsTo(Talent, {
        as: "id_talent_talent",
        foreignKey: "id_talent"
    });
    Talent.hasMany(Talent_bonus, {
        as: "talent_bonus",
        foreignKey: "id_talent"
    });
    Talent_specialisation.belongsTo(Talent, {
        as: "id_talent_talent",
        foreignKey: "id_talent"
    });
    Talent.hasMany(Talent_specialisation, {
        as: "talent_specialisations",
        foreignKey: "id_talent"
    });

    return {
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