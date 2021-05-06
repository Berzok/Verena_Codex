const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('talent_specialisation', {
    id_talent_specialisation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    id_talent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'talent',
        key: 'id_talent'
      }
    },
    nom: {
      type: "TEXT(140)",
      allowNull: true
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'talent_specialisation',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_talent_specialisation_1",
        unique: true,
        fields: [
          { name: "id_talent_specialisation" },
        ]
      },
    ]
  });
};
