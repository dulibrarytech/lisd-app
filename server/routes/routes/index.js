var express = require('express');
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");

router.get('/', function(req, res) {
    res.render('index.html');
});

// Data: integer fromYear, integer toYear
router.get('/get/data/all', function(req, res) {
	if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT) {
		aggregatorController.getDataAll(req, res);
	}
    else {
    	res.statusCode = 403;
    	res.end();
    }
});

module.exports = router;