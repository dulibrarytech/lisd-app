'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Class = require("../models/Class.js");
var bodyParser = require('body-parser');

module.exports.classAdd = function(req, res) {

	if(!req.body.data || !req.body.data.className) {
		res.sendStatus(403);
		return 0;
	}

	// TODO: Validate in middleware. If invalid, either place null or return 400 to client
	var data = {

		className: req.body.data.className,
		courseNumber: req.body.data.courseNumber,
		instructor: req.body.data.instructorName,
		date: req.body.data.classDate,
		quarter: req.body.data.quarter,
		undergraduates: Number(req.body.data.undergraduates),
		graduates: Number(req.body.data.graduates),
		faculty: Number(req.body.data.facultyStaff),
		other: Number(req.body.data.other),
		associatedLibrarians: req.body.data['librarian'],
	    location: req.body.data['location'],
	    department: req.body.data['department'],
	    type: req.body.data['classType'],
	    acrlFrame: req.body.data['acrlFrame'],
	    comments: {}
	}

	if(req.body.data.commentText) {
		var commenter = "Initial comment";
		data["comments"] = [];
		data["comments"].push({
			name: commenter,	// TODO: add initial comment commentor name is necessary
			text: req.body.commentText
		});
	}

	Class.addDocument(data, function(response) {
		res.send(response);
	});
};

module.exports.getClassProperties = function(req, res) {
	Class.getPropertyData(function(response) {
		res.send(response);
	});
};

module.exports.classGet = function(req, res) {
	Class.getData(req.query.classID, function(response) {
		res.send(response);
	});
};

module.exports.classUpdate = function(req, res) {

	var data = {

		className: req.body.data.className,
		courseNumber: req.body.data.courseNumber,
		instructor: req.body.data.instructorName,
		date: req.body.data.classDate,
		quarter: req.body.data.quarter,
		undergraduates: Number(req.body.data.undergraduates),
		graduates: Number(req.body.data.graduates),
		faculty: Number(req.body.data.facultyStaff),
		other: Number(req.body.data.other),
		associatedLibrarians: req.body.data['librarian'],
	    location: req.body.data['location'],
	    department: req.body.data['department'],
	    type: req.body.data['classType'],
	    acrlFrame: req.body.data['acrlFrame'],
	    comments: []
	}

	Class.updateData(req.body.classID, data, function(response) {
		res.send(response);
	});
};

module.exports.classDelete = function(req, res) {
	Class.removeData(req.body.classID, function(response) {
		res.send(response);
	});
};

module.exports.classGetComments = function(req, res) {
	Class.getClassComments(req.query.classID, function(response) {
		res.send(response);
	});
};

module.exports.classAddComment = function(req, res) {
	Class.appendComment(req.body.classID, req.body.comment, function(response) {
		res.send(response);
	});
};

module.exports.classUpdateComment = function(req, res) {
	Class.updateComment(req.body.classID, req.body.commentIndex, req.body.commentBody, function(response) {
		res.send(response);
	});
};

