module.exports = (veritas) => {

    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var session = require('express-session')
    const helmet = require("helmet");

    var FileStore = require('session-file-store')(session);

    var fileStoreOptions = {};

    var indexRouter = require('./routes/index')(bot);
    var loginRouter = require('./routes/login')(bot);
    var adminRouter = require('./routes/admin')(bot);
    var logoutRouter = require('./routes/logout')(bot);
    var apiRouter = require('./routes/api')(bot);

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.session = session({
        store: new FileStore(fileStoreOptions),
        secret: 'P13_AIR_ADMIN_PANEL__',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: (30 * 86400 * 1000), secure: bot.useSSL, expires: new Date(Date.now() + (30 * 86400 * 1000)) }
    });

    app.use(app.session);

    app.use(helmet());

    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/admin', adminRouter);
    app.use('/logout', logoutRouter);
    app.use('/api', apiRouter);
    app.use('/socketIO', express.static(path.join(__dirname, '../node_modules/socket.io-client/dist')));

    app.use(function(req, res, next) {
        delete req.session.error;
        delete req.session.success;
        next();
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = bot.devEnv ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
        next();
    });

    return app;

}