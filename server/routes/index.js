var aggregatorController = require("../controllers/aggregatorController.js");
var classController = require("../controllers/classController.js");
var userController = require("../controllers/userController.js");
var librarianController = require("../controllers/librarianController.js");
var loginModel = require("../models/Login");
//var auth = require("../config/auth.js")();

module.exports = function (app, passport) {

	var checkHeader = function(req, res, next) {

	  if(req.headers['x-id-header'] == 'lisd-client' || process.env.ENABLE_BROWSER_TEST == 'true') {
	    next();
	  }
	  else {
	  	console.log("Receive request from unidentified client");
	    res.statusCode = 403;
	    res.send();
	  }
	};

	app.get('/', function(req, res) {
	    res.render('index.html');
	});

	app.use(checkHeader);
	//app.use(checkToken);

	// Data: AGG functions
	app.get('/get/data/all', function(req, res) {			// TODO remove /get from route
		saggregatorController.getDataAll(req, res);
	});

	app.get('/get/data/entry/selectValues', function(req, res) {
	    aggregatorController.getDataEntrySelectValues(req, res);
	});

	app.get('/get/data/search/selectValues', function(req, res) {
	    aggregatorController.getDataSearchSelectValues(req, res);
	});

	app.get('/get/data/search/allStatistics', function(req, res) {
	    aggregatorController.getDataSearchAllStatistics(req,res);
	});

	app.get('/get/data/search/class', function(req, res) {
	    aggregatorController.getDataSearchClass(req,res);
	});


	// Class model
	app.post('/class/add', function(req, res) { 
	    classController.classAdd(req, res);
	});

	// User model
	app.post('/user/login', function(req, res) { 
	    
	    userController.authenticateLogin(req, res);
	});

	// Protected routes
	app.use(loginModel.validateToken);

	app.get('/user/all', function(req, res) { 
	    userController.userAll(req, res);
	});

	app.get('/librarian/all', function(req, res) { 
	    librarianController.librarianAll(req, res);
	});
};