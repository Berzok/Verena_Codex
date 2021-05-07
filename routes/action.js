var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');
const models = require('./../standalone')();


module.exports = () => {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true}));

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

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });


    router.post('/loadTalents', function(req, res) {
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
        models.Talent.createTalent(req.body).then((data) => {
            if(data){
                setResponseOk('Création réussie', 'Talent ' + data.nom + ' créé !');
            }
            res.send(response);
        });
    });

    router.post('/updateTalent', function(req, res) {
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
        models.Talent.deleteTalent(req.body.id_talent).then((data) => {
            if(data){
                setResponseOk('Suppression réussie', 'Le talent a été supprimé !');
            }
            res.send(response);
        });
    });


    return router;
}