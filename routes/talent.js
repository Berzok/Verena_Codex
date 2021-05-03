var express = require('express');
var router = express.Router();

module.exports = () => {

    router.use(function timeLog (req, res, next) {
        //console.dir(req.url);
        next();
    });


    router.post('/talent/getTalents', function(req, res) {
        res.sendFile(req.params.filename, {
            root: './web/js',
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

        /*
        res.sendFile('index.html', {
            root: './web',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        });
        */
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