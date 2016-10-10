'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");
var bodyParser = require('body-parser');

module.exports.insertClass = function(req, res) {

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
	    comments: [req.body.comment]
	}

	for(var key in req.body) {
		if(key.substring(0,9) == 'librarian') {
			data['associatedLibrarians'].push(req.body[key]);
		}
		if(key.substring(0,9) == 'location') {
			data['location'].push(req.body[key]);
		}
		if(key.substring(0,9) == 'department') {
			data['department'].push(req.body[key]);
		}
		if(key.substring(0,9) == 'classType') {
			data['classType'].push(req.body[key]);
		}
		if(key.substring(0,9) == 'acrlFrame') {
			data['acrlFrame'].push(req.body[key]);
		}
	}
	
	console.log("adding data: " + data.className);
	Class.addDocument(data, function(response) {
		res.send(response);
	});

	// DEV
	// console.log("server receives: " + data);
	// res.statusCode = 200;
	// res.send();
}
