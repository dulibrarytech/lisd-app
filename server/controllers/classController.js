'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");
var bodyParser = require('body-parser');

module.exports.insertClass = function(req, res) {

	console.log("request in controller: ");
	console.log(req.body);

	// TODO: Validate in middleware. If invalid, either place null or return 400 to client
	var data = {

		className: req.body.className,
		courseNumber: req.body.courseNumber,
		instructor: req.body.instructorName,
		date: req.body.classDate,
		quarter: req.body.quarter,
		undergraduates: Number(req.body.undergraduates),
		graduates: Number(req.body.graduates),
		faculty: Number(req.body.facultyStaff),
		other: Number(req.body.other),
		associatedLibrarians: [],
	    location: [],
	    department: [],
	    type: [],
	    acrlFrame: [],
	    comments: []
	}

	// Build arrays required in the data
	for(var key in req.body) {
		if(key.substring(0,9) == 'librarian') {
			data['associatedLibrarians'] = req.body[key];
		}
		if(key.substring(0,8) == 'location') {
			data['location'] = req.body[key];
		}
		if(key.substring(0,10) == 'department') {
			data['department'] = req.body[key];
		}
		if(key.substring(0,9) == 'classType') {
			data['type'] = req.body[key];
		}
		if(key.substring(0,9) == 'acrlFrame') {
			data['acrlFrame'] = req.body[key];
		}
	}

	data["comments"].push({
		name: null,
		text: req.body.commentText
	})
	
	console.log("adding data");
	console.log(data);
	Class.addDocument(data, function(response) {
		res.send(response);
	});

	// DEV
	// console.log("server receives: " + data);
	// res.statusCode = 200;
	// res.send();
}
