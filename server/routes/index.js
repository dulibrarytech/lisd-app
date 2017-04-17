var aggregatorController = require("../controllers/aggregatorController.js");
var classController = require("../controllers/classController.js");
var userController = require("../controllers/userController.js");

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

	app.get('/get/data/search/allStatistics', function(req, res) {
	    aggregatorController.getDataSearchAllStatistics(req,res);
	});

	app.get('/get/data/search/class', function(req, res) {
	    aggregatorController.getDataSearchClass(req,res);
	});

	app.post('/insert/class', function(req, res) { 
	    classController.insertClass(req, res);
	});

	app.post('/admin/authenticate', function(req, res) {
	    userController.authenticateUser(req,res);
	});
};