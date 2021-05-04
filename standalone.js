// app.js
const express = require('express');
const path = require('path');
const sqrl = require('squirrelly');
const Sequelize = require("sequelize");
sqrl.getConfig({views: './web/'});

var initModels = require('./models/init-models.js');


// Create Express app
const app = express();
const port = 61046;


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
module.exports = (models) => {
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

app.get('/', function(req, res){
    res.redirect('/web');
});



app.use('/web', webRouter);
app.use('/action', actionRouter);



// Start the Express server
app.listen(port, () => console.log('Server running on port ' + port + '!'));