var express = require('express');
var router = express.Router();

module.exports = () => {

    router.use(function timeLog (req, res, next) {
        console.dir(req.url);
        next();
    })

    router.get('/js/:filename', function(req, res) {
        console.dir('le_js');
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

    router.get('/', function(req, res) {
        console.dir('heho');
        res.sendFile('index.html', {
            root: './web',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });

    router.get('/:filename', function(req, res) {
        console.dir(req.params.filename);
        res.sendFile(req.params.filename+'.html', {
            root: './web',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
    });

    return router;
}