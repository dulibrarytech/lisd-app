var aggregatorController = require("../controllers/aggregatorController.js");
var classController = require("../controllers/classController.js");
var userController = require("../controllers/userController.js");
var auth = require("../config/auth.js")();

module.exports = function (app, passport) {

	var checkHeader = function(req, res, next) {

	  if(req.headers['x-access-header'] == 'lisd-client' || process.env.ENABLE_BROWSER_TEST == 'true') {
	    next();
	  }
	  else {
	    res.statusCode = 403;
	    res.send();
	  }
	};

	app.get('/', function(req, res) {
	    res.render('index.html');
	});

	app.use(checkHeader);
	//app.use(checkToken);

	// Data: integer fromYear, integer toYear
	app.get('/get/data/all', function(req, res) {
		saggregatorController.getDataAll(req, res);
	});

	app.get('/get/data/entry/selectValues', function(req, res) {
	    aggregatorController.getDataEntrySelectValues(req, res);
	});

	app.get('/get/data/search/selectValues', function(req, res) {
	    aggregatorController.getDataSearchSelectValues(req, res);
	});

	app.get('/get/data/search/allStatistics', auth.authenticate(), function(req, res) {
		console.log("Session dev test passes authenticate:");
		//console.log(req);
	    aggregatorController.getDataSearchAllStatistics(req,res);
	});

	app.get('/get/data/search/class', function(req, res) {
	    aggregatorController.getDataSearchClass(req,res);
	});

	app.post('/class/add', function(req, res) { 
	    classController.classAdd(req, res);
	});

	// Get token if valid
	app.post('/user/login', function(req, res) { 
	    
	    userController.authenticateLogin(req, res);
	});

	// TODO Token validation middleware
	// Update token and return if valid

	// TODO
	// Add protected routes below
	// all /admin routes (user crud)

	// app.post('/admin/authenticate', function(req, res) {
	//     userController.authenticateUser(req,res);
	// });
};