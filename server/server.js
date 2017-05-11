var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash    = require('connect-flash');

var app = express();
var port     = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

require('dotenv').config();
var settings = require("./config/settings");
//require('./config/passport')(passport); // pass passport for configuration

var database = require('./util/database.js');
database.connect();

app.set('superSecret', settings.secret); // secret variable
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(favicon('../client/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(flash());

//app.use(auth.initialize());
require('./routes/index')(app);

//app.disable('x-powered-by');

// Start server
app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
    console.log('LISD service listening on port ' + server.address().port);
});

module.exports = app;
