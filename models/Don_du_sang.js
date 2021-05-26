const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const Don_du_sang = sequelize.define('Don_du_sang', {
        id_don_du_sang: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
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
        tableName: 'don_du_sang',
        timestamps: false,
        indexes: [
            {
                name: "sqlite_autoindex_don_du_sang_1",
                unique: true,
                fields: [
                    {name: "id_don_du_sang"},
                ]
            },
        ]
    });

    Don_du_sang.getDonDuSang = async function (id_don_du_sang) {
        try {
            let data = '{}';
            if (id_don_du_sang) {
                data = await Don_du_sang.findByPk(id_don_du_sang, {
                    attributes: ['id_don_du_sang', 'nom', 'description', 'effet'],
                    where: {
                        deleted: 0
                    }
                });
                return data ? data : null;
            }
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Don_du_sang.createDonDuSang = async function (params) {
        try {
            return await Don_du_sang.create(params);
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Don_du_sang.deleteDonDuSang = async function (id_don_du_sang) {
        try {
            let donDuSangToDelete = await this.getDonDuSang(id_don_du_sang);
            return await donDuSangToDelete.destroy();
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Don_du_sang.updateDonDuSang = async function (id_don_du_sang, params) {
        try {
            let donDuSangToUpdate = await this.getDonDuSang(id_don_du_sang);

            donDuSangToUpdate.nom = params.nom;
            donDuSangToUpdate.description = params.description;
            donDuSangToUpdate.effet = params.effet;

            return await donDuSangToUpdate.save();
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }

    Don_du_sang.getAll = async function () {
        try {
            return await Don_du_sang.findAll({
                raw: true,
            });
        } catch (error) {
            console.error('[ERREUR]: ' + error);
            return false;
        }
    }


    return Don_du_sang;
};
