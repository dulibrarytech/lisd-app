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

	app.get('/get/data/search/allStatistics', function(req, res) {
		console.log(req.session.user);
	    aggregatorController.getDataSearchAllStatistics(req,res);
	});

	app.get('/get/data/search/class', function(req, res) {
	    aggregatorController.getDataSearchClass(req,res);
	});

	app.post('/class/add', function(req, res) { 
	    classController.classAdd(req, res);
	});

	// app.post('/user/login', 
	//   passport.authenticate('local-login'),
	//   function(req, res) {
	//   	console.log("Login route response session:")
	//   	console.log(req.session);
	//     res.status = 200;
	//     res.send(req.session);
	// });

	app.post('/user/login', function(req, res) { 
	    
	    userController.authenticateLogin(req, res);
	});





	app.post('/admin/authenticate', function(req, res) {
	    userController.authenticateUser(req,res);
	});
};