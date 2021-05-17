var express = require('express');
var fs = require('fs');
var sqrl = require('squirrelly')
var router = express.Router();
const {version} = require('./../standalone.js');


module.exports = () => {

    let render_data = {};
    fs.readFile('./web/imports.html', 'utf8', function(err, data){
        if(err){
            console.log(err);
        }
        render_data.head = data;
    });
    fs.readFile('./web/menu.html', 'utf8', function(err, data){
        if(err){
            console.log(err);
        }
        render_data.sidemenu = data;
    });

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });


    router.get('/js/:folder?/:filename', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/js' + (req.params.folder ? '/' + req.params.folder : ''),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });

    router.get('/style/:filename', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/style',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });
    router.get('/img/:filename', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/img',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });
    router.get('/icons/:filename', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/icons',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });

    router.get('/', function(req, res, next) {
        req.params.filename = 'index';

        res.render('index.html', {
            head: sqrl.render(render_data.head, {
                id_utilisateur: req.session?.user ? req.session?.user : null,
                nom: req.session?.nom ? req.session?.nom : null,
                picture: req.session?.picture ? req.session?.picture : null,
                can_create: req.session?.permissions?.canCreate ? req.session?.permissions?.canCreate : null,
                can_update: req.session?.permissions?.canUpdate ? req.session?.permissions?.canUpdate : null,
                can_delete: req.session?.permissions?.canDelete ? req.session?.permissions?.canDelete : null,
            }),
            sidemenu: render_data.sidemenu
        });
    });

    router.get('/:filename', function(req, res) {
        res.render(req.params.filename+'.html', {
            head: sqrl.render(render_data.head, {
                id_utilisateur: req.session?.user ? req.session?.user : null,
                nom: req.session?.nom ? req.session?.nom : null,
                picture: req.session?.picture ? req.session?.picture : null,
                can_create: req.session?.permissions?.canCreate ? req.session?.permissions?.canCreate : null,
                can_update: req.session?.permissions?.canUpdate ? req.session?.permissions?.canUpdate : null,
                can_delete: req.session?.permissions?.canDelete ? req.session?.permissions?.canDelete : null,
            }),
            sidemenu: sqrl.render(render_data.sidemenu, {
                version: version(),
            })
        });
        /*
        res.sendFile(req.params.filename+'.html', {
            root: './web',
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