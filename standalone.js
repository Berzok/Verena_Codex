// app.js
const express = require('express');
const path = require('path');
var webRouter = require('./routes/web')();

// Create Express app
const app = express();
const port = 61046;


app.use('/js', express.static('web/js'));
app.use('/style', express.static('web/style'));



app.use('/web', webRouter);

// A sample route



// Start the Express server
app.listen(port, () => console.log('Server running on port ' + port + '!'));