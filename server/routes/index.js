var aggregatorController = require("../controllers/aggregatorController.js");
var classController = require("../controllers/classController.js");
var userController = require("../controllers/userController.js");

module.exports = function (app, passport) {

	var checkHeader = function(req, res, next) {

		console.log("checkHeader: session:");
		console.log(req.session);
		console.log("checkHeader: session.user:");
		console.log(req.session.user);

	  if(req.headers['x-access-header'] == 'lisd-client' || process.env.ENABLE_BROWSER_TEST == 'true') {
	    next();
	  }
	  else {
	    res.statusCode = 403;
	    res.send();
	  }
	};

	app.get('/', function(req, res) {
		console.log("Setting user");
		req.session.user = "USER";
		console.log("checkHeader: session.user:");
		console.log(req.session.user);
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
		console.log(req.session.user);
	    aggregatorController.getDataSearchAllStatistics(req,res);
	});

	app.get('/get/data/search/class', function(req, res) {
	    aggregatorController.getDataSearchClass(req,res);
	});

	app.post('/class/add', function(req, res) { 
	    classController.classAdd(req, res);
	});

	// app.post('/user/add', function(req, res) { 
	//     passport.authenticate('local-signup', function(response) {
	//     	console.log("PAdd local-signup response:");
	//     	console.log(response);
	//     });
	// });

	// app.post('/user/login', function(req, res) { 
	// 	console.log("login route");
	//     passport.authenticate('local-login', function(response) {
	//     	console.log("PAuth local-login response:");
	//     	console.log(response);
	//     });
	// });

	app.post('/user/login', 
	  passport.authenticate('local-login'),
	  function(req, res) {
	    console.log("LL resp");
	    console.log(res);
	    console.log("LL session");
	    console.log(req.session);
	});





	app.post('/admin/authenticate', function(req, res) {
	    userController.authenticateUser(req,res);
	});
};