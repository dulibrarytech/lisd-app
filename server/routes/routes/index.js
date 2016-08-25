var express = require('express');
var router = express.Router();
var aggregatorController = require("../../controllers/aggregatorController.js");

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/get/data/all', function(req, res) {
    //aggregatorController.getAllData();
    console.log("GET /get/data/all");
    res.send({test:123});
});

module.exports = router;