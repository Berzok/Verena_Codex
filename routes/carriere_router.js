var express = require('express');
var router = express.Router({mergeParams: true});
const sequelize = require('sequelize');
const {models : initModels} = require('./../standalone');
var path = require('path');

models = initModels();
const Carriere = models.Carriere;
const CarriereTalent = models.Carriere_talent;
const Utilisateur = models.Utilisateur;

module.exports = (carriereRouter) => {


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
        Carriere.getAll().then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/get', function(req, res) {
        Carriere.getCarriere(req.body.id_carriere).then((data) => {
            if(data){
                res.send(data);
            }
        });
    });

    router.post('/getTalents', function(req, res) {
        if(!req.body.id_carriere || req.body.id_carriere == ''){
            res.send({});
            return false;
        }
        Carriere.getTalents(req.body.id_carriere).then((data) => {
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
        Carriere.createCarriere(req.body).then((data) => {
            if(data){
                setResponseOk('Création réussie', 'Carriere ' + data.nom + ' créé !');
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

        let id_carriere = req.body.id_carriere;
        delete req.body.id_carriere;

        Carriere.updateCarriere(id_carriere, req.body).then((data) => {
            if(data){
                setResponseOk('Mise à jour réussie', 'Carrière mise à jour !');
            }
            res.send(response);
        });
    });

    router.post('/upload_image', function(req, res){
        if(!checkDroit(req.session.user, 'update') && !checkDroit(req.session.user, 'create')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        let sampleFile;
        let uploadPath;

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.file;
        uploadPath = __dirname + '/../web/img/' + sampleFile.name + '.' + req.body.file_extension;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {
            if(err) {
                console.dir('error');
                return;
            }
            Carriere.findByPk(req.body.id_carriere).then((carriere) => {
                carriere.image = 'img/' + sampleFile.name + '.' + req.body.file_extension;
                carriere.save().then(() => {
                    setResponseOk('Mise en ligne réussie', 'Image uploadée');
                    res.send(response);
                    return false;
                })
            });
        });
    })

    router.post('/delete', function(req, res) {
        if(!checkDroit(req.session.user, 'delete')){
            response.message = 'Permission non accordée.';
            res.send(response);
            return false;
        }

        Carriere.deleteCarriere(req.body.id_carriere).then((data) => {
            if(data){
                setResponseOk('Suppression réussie', 'Le Carriere a été supprimé !');
            }
            res.send(response);
        });
    });


    return router;
}