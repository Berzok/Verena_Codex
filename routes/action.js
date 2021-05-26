var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');
const {models : initModels} = require('./../standalone');
var carriereRouter = require('./carriere_router')(carriereRouter);
var donDuSangRouter = require('./don_du_sang_router')(donDuSangRouter);
var talentRouter = require('./talent_router')(talentRouter);


models = initModels();

module.exports = () => {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true}));

    router.use('/don_du_sang', donDuSangRouter);
    router.use('/talent', talentRouter);
    router.use('/carriere', carriereRouter);

    var session;

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


    router.post('/isConnected', (req, res, next) => {
        res.send(!!session);
    });

    router.post('/login', function(req, res){
        if(!req.body.login || !req.body.password){
            response.title = 'Connexion impossible';
            response.message = 'Veuillez vérifier vos informations';
            res.send(response);

        } else {
            //Ici, on vérifie le login/password
            models.Utilisateur.checkCredentials(req.body.login, req.body.password).then((data) => {
                if(data){
                    req.session.user = data.id_utilisateur;
                    req.session.nom = data.nom;
                    req.session.picture = data.picture;
                    req.session.permissions = data.permissions;
                    session = req.session;
                    console.log('[User logged]: ' + req.session.nom);
                    setResponseOk('', '');
                    res.send(response);
                }
            });
        }
    })

    router.get('/logout', function(req, res){
        req.session.destroy(function(){
            console.log("user logged out.")
        });
        res.redirect('/login');
    });


    return router;
}