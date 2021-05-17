var express = require('express');
var router = express.Router({mergeParams: true});
const sequelize = require('sequelize');
const {models : initModels} = require('./../standalone');

models = initModels();

module.exports = (talentRouter) => {


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
                r = await models.Utilisateur.canCreate(id_utilisateur);
                break
            case 'update':
                r = await models.Utilisateur.canUpdate(id_utilisateur);
                break;
            case 'delete':
                r = await models.Utilisateur.canDelete(id_utilisateur);
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
        models.Talent.getAll().then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/getTalent', function(req, res) {
        models.Talent.getTalent(req.body.id_talent).then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/createTalent', function(req, res) {
        if(!checkDroit(req.session.user, 'create')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }
        models.Talent.createTalent(req.body).then((data) => {
            if(data){
                setResponseOk('Création réussie', 'Talent ' + data.nom + ' créé !');
            }
            res.send(response);
        });
    });

    router.post('/updateTalent', function(req, res) {
        if(!checkDroit(req.session.user, 'update')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        let id_talent = req.body.id_talent;
        delete req.body.id_talent;

        models.Talent.updateTalent(id_talent, req.body).then((data) => {
            if(data){
                setResponseOk('Mise à jour réussie', 'Talent mis à jour !');
            }
            res.send(response);
        });
    });

    router.post('/deleteTalent', function(req, res) {
        if(!checkDroit(req.session.user, 'delete')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        models.Talent.deleteTalent(req.body.id_talent).then((data) => {
            if(data){
                setResponseOk('Suppression réussie', 'Le talent a été supprimé !');
            }
            res.send(response);
        });
    });


    return router;
}