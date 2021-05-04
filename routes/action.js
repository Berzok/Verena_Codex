var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');
const models = require('./../standalone')();


module.exports = () => {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true}));

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });


    router.post('/getTalents', function(req, res) {
        models.Talent.getAll().then((response) => {
            if(response){
                res.send(response);
            }
        });
    });

    router.post('/createTalent', function(req, res) {
        let newTalent = models.Talent.createTalent(req.body);
        res.send(newTalent);
    });



    return router;
}