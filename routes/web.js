var express = require('express');
var fs = require('fs');
var router = express.Router();

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



    router.get('/js/:filename', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/js',
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
            head: render_data.head,
            sidemenu: render_data.sidemenu
        });
    });

    router.get('/:filename', function(req, res) {
        res.render(req.params.filename+'.html', {
            head: render_data.head,
            sidemenu: render_data.sidemenu
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