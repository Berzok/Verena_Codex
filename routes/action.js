var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');
const models = require('./../standalone')();


module.exports = () => {

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });


    router.post('/getTalents', function(req, res) {
        console.dir(models);
        let talents = models.Talent.getAll();
        res.send(talents);

        /*
        res.sendFile(req.params.filename, {
            root: './web/js',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
        */
    });



    return router;
}