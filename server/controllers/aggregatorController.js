'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Aggregator = require("../models/Aggregator");
var Librarian = require("../models/Librarian");
var Location = require("../models/Location");
var Department = require("../models/Department");

module.exports.getDataAll = function(req,res) {

	//var response = res;
	var fromYear = req.query.fromYear, toYear = req.query.toYear;

	var data = {
		fromDate: fromYear + '-' + settings.server.fiscalYearStart,
		toDate: toYear + '-' + settings.server.fiscalYearEnd,
		listByMonth: 0,
		librarianID: 0
	};

	Aggregator.getAllData(data, function(responseData) {
		res.send(responseData);
	});
}

module.exports.getDataSelectValues = function(req, res) {

	var response = res;
	var responseData = [];
	//var queryModules = [];
	var dataQueries = 3;

	// queryModules.push(Librarian); ...

	var sendResponse = function(data) {
		responseData.push(data);
		if(responseData.length >= dataQueries) {
			response.send(responseData);
		}
	};

	// TODO loop queryModules
	Librarian.getList(sendResponse);
	Location.getList(sendResponse);
	Department.getList(sendResponse);
}