// app.js
const express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const upload  = require('express-fileupload');
const path = require('path');
const sqrl = require('squirrelly');
const Sequelize = require("sequelize");
sqrl.getConfig({views: './web/'});

var initModels = require('./models/init-models.js');
var fileStoreOptions = {};

// Create Express app
const app = express();

app.set('version', '0.1.5');

app.use(upload());

app.use(session({
    store: new FileStore(fileStoreOptions),
    resave: false,
    saveUninitialized: true,
    secret: "Veritas_Project",
    cookie: {
        maxAge: (30 * 86400 * 1000),                          //
        secure: false, //True en prod
        expires: new Date(Date.now() + (3600 * 24 * 7 * 1000))     //30 * 86400 * 1000 Pour 1 mois
    }
}));

module.exports.version = (version) => {
    return app.get('version');
};


const host = '0.0.0.0';
const port = process.env.PORT || 3000;


function initDatabase(){
    app.sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'veritas_project_bdd.sqlite'
    });

    return app.sequelize;
}

initDatabase();
module.exports.models = (models) => {
    models = initModels(app.sequelize);
    return models;
}

var webRouter = require('./routes/web')();
var actionRouter = require('./routes/action')();


app.set('title', 'Veritas Project');
app.set('views', __dirname + '/web');
app.engine('html', sqrl.renderFile);


app.use('/img', express.static('web/img'));
app.use('/js', express.static('web/js'));
app.use('/style', express.static('web/style'));
app.use('/node_modules', express.static('node_modules'));


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/', function(req, res){
    res.redirect('/web');
});



app.use('/web', webRouter);
app.use('/action', actionRouter);



// Start the Express server
app.listen(port, host, () => console.log('Server running on port ' + port + '!'));