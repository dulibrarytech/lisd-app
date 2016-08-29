var express = require('express');
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");

router.get('/', function(req, res) {
    res.render('index.html');
});

// Data: integer fromYear, integer toYear
router.post('/get/data/all', function(req, res) {
    aggregatorController.getDataAll(req, res);
});

module.exports = router;