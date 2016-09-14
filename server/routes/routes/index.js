var express = require('express');
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");

router.get('/', function(req, res) {
    res.render('index.html');
});

// Data: integer fromYear, integer toYear
router.get('/get/data/all', function(req, res) {
	if(req.headers['user-agent'] == process.env.CLIENT_USER_AGENT ||
		process.env.ENABLE_BROWSER_TEST == 'true') {	// TODO Add middleware
		
		aggregatorController.getDataAll(req, res);

        // DEV
       // res.statusCode = 200;
       // res.send();
	}
    else {
    	console.log(process.env.ENABLE_BROWSER_TEST);
    	res.statusCode = 403;
    	res.end();
    }
});

module.exports = router;