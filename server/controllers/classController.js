'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");
var bodyParser = require('body-parser');

module.exports.insertClass = function(req, res) {

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
		associatedLibrarians: req.body['librarian'],
	    location: req.body['location'],
	    department: req.body['department'],
	    type: req.body['classType'],
	    acrlFrame: req.body['acrlFrame'],
	    comments: []
	}
	data["comments"].push({
		name: "Commenter",	// DEV: Not implemented, this is a placeholder
		text: req.body.commentText
	})

	Class.addDocument(data, function(response) {
		res.send(response);
	});

	// DEV
	// console.log("server receives: " + data);
	// res.statusCode = 200;
	// res.send();
}

module.exports.getClassProperties = function(req, res) {
	Class.getPropertyData(function(response) {
		res.send(response);
	});
}
