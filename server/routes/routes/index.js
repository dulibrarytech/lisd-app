
var express = require('express');
var app = express();
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");
var classController = require("../../controllers/classController.js");
var userController = require("../../controllers/userController.js");

var checkHeader = function(req, res, next) {
  if(req.headers['x-access-header'] == 'lisd-client' || process.env.ENABLE_BROWSER_TEST == 'true') {
    next();
  }
  else {
    res.statusCode = 403;
    res.send();
  }
};

router.get('/', function(req, res) {
    res.render('index.html');
});

router.use(checkHeader);

// Data: integer fromYear, integer toYear
router.get('/get/data/all', function(req, res) {
		aggregatorController.getDataAll(req, res);
});

router.get('/get/data/entry/selectValues', function(req, res) {
    aggregatorController.getDataEntrySelectValues(req, res);
});

router.get('/get/data/search/selectValues', function(req, res) {
    aggregatorController.getDataSearchSelectValues(req, res);
});

router.get('/get/data/search/allStatistics', function(req, res) {
    aggregatorController.getDataSearchAllStatistics(req,res);
});

router.get('/get/data/search/class', function(req, res) {
    aggregatorController.getDataSearchClass(req,res);
});

router.post('/insert/class', function(req, res) { 
    classController.insertClass(req, res);
});

router.post('/admin/authenticate', function(req, res) {
    userController.authenticateUser(req,res);
});

module.exports = router;