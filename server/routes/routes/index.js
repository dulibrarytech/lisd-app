var express = require('express');
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/get/data/all', function(req, res) {
    console.log("GET /get/data/all");
    aggregatorController.getDataAll(req, res);
});

module.exports = router;