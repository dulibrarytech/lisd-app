
var express = require('express');
var app = express();
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");
var classController = require("../../controllers/classController.js");
var userController = require("../../controllers/userController.js");

router.get('/', function(req, res) {

    res.render('index.html');
});

// Data: integer fromYear, integer toYear
router.get('/get/data/all', function(req, res) {
	if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
		process.env.ENABLE_BROWSER_TEST == 'true') {	// TODO Add middleware
		
		aggregatorController.getDataAll(req, res);
	}
    else {
    	res.statusCode = 403;
    	//res.end();
      res.send();
    }
});

router.get('/get/data/entry/selectValues', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') { 
    
    aggregatorController.getDataEntrySelectValues(req, res);
  }
    else {
      res.statusCode = 403;
      //res.end();
      res.send();
    }
});

router.get('/get/data/search/selectValues', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') { 
    aggregatorController.getDataSearchSelectValues(req, res);
  }
    else {
      res.statusCode = 403;
      //res.end();
      res.send();
    }
});

router.get('/get/data/search/allStatistics', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') { 

      aggregatorController.getDataSearchAllStatistics(req,res);
  }
    else {
      res.statusCode = 403;
      //res.end();
      res.send();
    }
});

router.get('/get/data/search/class', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') { 

      aggregatorController.getDataSearchClass(req,res);
  }
    else {
      res.statusCode = 403;
      //res.end();
      res.send();
    }
});


router.post('/insert/class', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') {  
    
    classController.insertClass(req, res);
  }
    else {
      res.statusCode = 403;
      res.send();
    }
});

router.post('/admin/authenticate', function(req, res) {
  if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
    process.env.ENABLE_BROWSER_TEST == 'true') {  
    
    userController.authenticateUser(req,res);
  }
    else {
      res.statusCode = 403;
      res.send();
    }
});

// router.post('/insert/librarian', function(req, res) {

// });

module.exports = router;