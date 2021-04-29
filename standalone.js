// app.js
const express = require('express');
const path = require('path');

// Create Express app
const app = express();
const port = 61046;

app.use('/', express.static('web'));

// A sample route
app.get('/', function(req, res) {
    res.sendFile(req.params.name, {
        root: path.join(__dirname, 'web'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    });
});


app.get('/:filename', function(req, res) {
    //console.dir(req.params);
    res.sendFile(req.params.filename+'.html', {
        root: path.join(__dirname, './web'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    });
});

app.get('/*/:filename', function(req, res) {
    return;
    res.sendFile(req.params.name, {
        root: path.join(__dirname, 'web'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    });
});


// Start the Express server
app.listen(port, () => console.log('Server running on port ' + port + '!'));