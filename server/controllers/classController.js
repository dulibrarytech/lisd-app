'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");
var bodyParser = require('body-parser');

module.exports.insertClass = function(req, res) {

	var data = {

		className: req.body.className,
		courseNumber: req.body.courseNumber,
		instructor: req.body.instructor,
		dateCreated: req.body.dateCreated,
		undergraduates: req.body.undergraduates,
		graduates: req.body.graduates,
		faculty: req.body.faculty,
		other: req.body.other,
		associatedLibrarians: [],
	    location: [],
	    department: [],
	    classType: []
	}

	console.log(data);

	for(var key in req.body) {
		if(key.substring(0,9) == 'librarian') {
			data['associatedLibrarians'].push(req.body[key]);
		}
	
	}
	//console.log(res);
	Class.addDocument(data, function(response) {
		res.send(response);
	});
	// res.statusCode = 200;
	// res.send();
}
