var DataTypes = require("sequelize").DataTypes;
var _talent = require("./talent");
var _talent_bonus = require("./talent_bonus");
var _talent_specialisation = require("./talent_specialisation");

function initModels(sequelize) {
    var Talent = _talent(sequelize, DataTypes);
    var Talent_bonus = _talent_bonus(sequelize, DataTypes);
    var Talent_specialisation = _talent_specialisation(sequelize, DataTypes);

    Talent_bonus.belongsTo(Talent, {as: "id_talent_talent", foreignKey: "id_talent"});
    Talent.hasMany(Talent_bonus, {as: "talent_bonus", foreignKey: "id_talent"});
    Talent_specialisation.belongsTo(Talent, {as: "id_talent_talent", foreignKey: "id_talent"});
    Talent.hasMany(Talent_specialisation, {as: "talent_specialisations", foreignKey: "id_talent"});

    return {
        Talent,
        Talent_bonus,
        Talent_specialisation,
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
