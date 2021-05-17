var express = require('express');
var router = express.Router({mergeParams: true});
const sequelize = require('sequelize');
const {models : initModels} = require('./../standalone');

models = initModels();
const DonDuSang = models.Don_du_sang;
const Utilisateur = models.Utilisateur;

module.exports = (donDuSangRouter) => {


    var response = {
        status: 'nok',
        type: 'error',
        title: 'Action annulée',
        message: 'Erreur lors de l\'action.'
    }

    function setResponseOk(title, message){
        response.status = 'ok';
        response.type = 'success';
        response.title = title;
        response.message = message;
    }


    /**
     * Vérifie si un utilisateur a la permission d'effectuer une action
     * @param id_utilisateur
     * @param droit
     * @returns {*}
     */
    async function checkDroit(id_utilisateur, droit){
        let r;
        switch(droit){
            case 'create':
                r = await Utilisateur.canCreate(id_utilisateur);
                break
            case 'update':
                r = await Utilisateur.canUpdate(id_utilisateur);
                break;
            case 'delete':
                r = await Utilisateur.canDelete(id_utilisateur);
                break;
            default:
                r = false;
        }
        return r;
    }

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });



    router.post('/loadAll', function(req, res) {
        DonDuSang.getAll().then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/get', function(req, res) {
        DonDuSang.getDonDuSang(req.body.id_don_du_sang).then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/create', function(req, res) {
        if(!checkDroit(req.session.user, 'create')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }
        DonDuSang.createDonDuSang(req.body).then((data) => {
            if(data){
                setResponseOk('Création réussie', 'Don du sang ' + data.nom + ' créé !');
            }
            res.send(response);
        });
    });

    router.post('/update', function(req, res) {
        if(!checkDroit(req.session.user, 'update')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        let id_don_du_sang = req.body.id_don_du_sang;
        delete req.body.id_don_du_sang;

        DonDuSang.updateDonDuSang(id_don_du_sang, req.body).then((data) => {
            if(data){
                setResponseOk('Mise à jour réussie', 'Don du sang mis à jour !');
            }
            res.send(response);
        });
    });

    router.post('/delete', function(req, res) {
        if(!checkDroit(req.session.user, 'delete')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        DonDuSang.deleteDonDuSang(req.body.id_don_du_sang).then((data) => {
            if(data){
                setResponseOk('Suppression réussie', 'Le don du sang a été supprimé !');
            }
            res.send(response);
        });
    });


    return router;
}