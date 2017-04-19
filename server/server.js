var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');

var app = express();
var port     = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

require('dotenv').config();
require("./config/settings");
require('./config/passport')(passport); // pass passport for configuration

var database = require('./util/database.js');
database.connect();

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

app.use(session({ secret: 'lisdlisdlisdlisdlisdlisdlisd' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/index')(app, passport);

//app.disable('x-powered-by');

// Start server
app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function() {
    console.log('LISD service listening on port ' + server.address().port);
});

module.exports = app;
