'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");

module.exports.insertClass = function(req, res) {

	var data = {

		className: req.name,
		courseNumber: req.number,
		instructor: req.instructor,
		dateCreated: req.date,
		undergraduates: req.undergrad,
		graduates: req.grad,
		faculty: req.faculty,
		other: req.other,
		associatedLibrarians: [],
	    location: [],
	    department: [],
	    classType: [],
	    comments: []
	}

	for(var key in req) {
		if(key.substring(0,9) == 'librarian') {
			data['associatedLibrarians'].push(req[key]);
		}



		
	}

	Class.addDocument(data, function(response) {
		res.send(response);
	});
}
