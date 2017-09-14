var aggregatorController = require("../controllers/aggregatorController.js");
var classController = require("../controllers/classController.js");
var userController = require("../controllers/userController.js");
var propertyController = require("../controllers/propertyController.js");
var loginModel = require("../models/Login");
var settings = require('../config/settings');

module.exports = function (app, passport) {

	var checkHeader = function(req, res, next) {

	  if(req.headers['client-id-header'] == settings.lisdClientHeader || process.env.ENABLE_BROWSER_TEST == 'true') {
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

	app.post('/user/add/DUID', function(req, res) { 
	    userController.userAddDUID(req, res);
	});

	// Protected routes
	if(settings.runtime_env != 'development') {
		app.use(loginModel.validateToken);
	}

	app.get('/user/all', function(req, res) { 
	    userController.userAll(req, res);
	});

	app.post('/user/add', function(req, res) { 
	    userController.userAdd(req, res);
	});

	app.get('/user/get', function(req, res) { 
	    userController.userGet(req, res);
	});

	app.put('/user/update', function(req, res) { 
	    userController.userUpdate(req, res);
	});

	app.delete('/user/remove', function(req, res) { 
	    userController.userRemove(req, res);
	});



	app.get('/property/all/:name', function(req, res) { 
	    propertyController.propertyAll(req, res);
	});

	app.post('/:property/add/:name', function(req, res) { 
	   
	});

	app.get('/property/get/:name', function(req, res) { 
	    propertyController.propertyGet(req, res);
	});

	app.put('/property/update/:name', function(req, res) { 
	    propertyController.propertyUpdate(req, res);
	});

	app.delete('/property/remove/:name', function(req, res) { 
	   
	});
};