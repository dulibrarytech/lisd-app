'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Aggregator = require("../models/Aggregator");
var Librarian = require("../models/Librarian");
var Location = require("../models/Location");
var Department = require("../models/Department");

module.exports.getDataAll = function(req,res) {

	if(!req.query.fromYear || !req.query.toYear) {
		res.sendStatus(403);
		return 0;
	}

	var fromYear, toYear;
	var d = new Date();
	if(typeof req.query.fromYear == 'undefined') {
		fromYear = "1864";
	}
	else {
		fromYear = req.query.fromYear + '-' + settings.server.fiscalYearStart;
	}
	if(typeof req.query.toYear == 'undefined') {
		toYear = d.getFullYear();
	}
	else {
		toYear = req.query.toYear + '-' + settings.server.fiscalYearEnd;
	}

	var data = {
		fromDate: fromYear + "-01-01",
		toDate: toYear + "-12-31",
		librarianID: 0
	};

	Aggregator.getAllData(data, function(responseData) {
		res.send(responseData);
	});
}

// Data for the entry form
module.exports.getDataEntrySelectValues = function(req, res) {

	var response = res;
	var responseObject = {};
	var count = 0;

	// var queryModules = [Librarian, Location, Department]; // DEV
	var queryModules = [Librarian];

	// Callback for getList responseData, send data when all requests are complete
	var sendResponse = function(responseData) {
		if(responseData.status == "ok") {
			for(var key in responseData.data) {
				responseObject[key] = responseData.data[key];
			}
			count++;
		}

		if(count >= queryModules.length) {
			response.send(responseObject);
		}
	};

	// Request the data from all modules
	for(var key in queryModules) {
		queryModules[key].getList(sendResponse);
	}
}

// Data for the search form
module.exports.getDataSearchSelectValues = function(req, res) {

	var response = res;
	var responseObject = {};
	var count = 0;
	var queryModules = [Librarian];

	var sendResponse = function(responseData) {
		if(responseData.status == "ok") {
			for(var key in responseData.data) {
				responseObject[key] = responseData.data[key];
			}
			count++;
		}

		if(count >= queryModules.length) {
			response.send(responseObject);
		}
	};

	// Request the data from all modules
	for(var key in queryModules) {
		queryModules[key].getAll(sendResponse);
	}
}

var getDates = function(fromYear, toYear, timeframe, quarter) {

	var dates = {
		from: "",
		to: ""
	}

	if(timeframe == "Fiscal") {
		dates.from = fromYear + '-' + settings.server.fiscalYearStart;
		dates.to = toYear + '-' + settings.server.fiscalYearEnd;
	}
	else if(timeframe == "Academic") {
		dates.from = fromYear + '-' + settings.server.academicYearStart;
		dates.to = toYear + '-' + settings.server.academicYearEnd;
	}
	else if(timeframe == "Quarter") {  // fromYear will == toYear

		if(quarter == "Fall") {
			dates.from = fromYear + '-' + settings.server.quarter1Start;
			dates.to = toYear + '-' + settings.server.quarter1End;
		}
		else if(quarter == "Winter") {
			dates.from = fromYear + '-' + settings.server.quarter2Start;
			dates.to = toYear + '-' + settings.server.quarter2End;
		}
		else if(quarter == "Spring") {
			dates.from = fromYear + '-' + settings.server.quarter3Start;
			dates.to = toYear + '-' + settings.server.quarter3End;
		}
		else if(quarter == "Summer") {
			dates.from = fromYear + '-' + settings.server.quarter4Start;
			dates.to = toYear + '-' + settings.server.quarter4End;
		}
	}
	else {
		dates.from = fromYear + '-01-01';  // defaults to solar year
		dates.to = toYear + '-12-31';
	}

	return dates;
}

module.exports.getDataSearchAllStatistics = function(req, res) {

	if(!req.query.fromYear || !req.query.toYear || !req.query.statsDisplay || !req.query.searchTimeframe || !req.query.statsType) {
		res.sendStatus(403);
		return 0;
	}
	
	// Required params
	var fromYear 	= req.query.fromYear;
	var toYear 		= req.query.toYear;
	var display 	= req.query.statsDisplay; // Can be either All or Department
	var timeframe	= req.query.searchTimeframe;
	var statsType   = req.query.statsType;

	// Set optional params
	var librarian, quarter;
	if(typeof req.query.librarian != 'undefined') { librarian = req.query.librarian; }
	else { librarian = ""; }
	if(typeof req.query.quarter != 'undefined') { quarter = req.query.quarter; }
	else { quarter = ""; }


	// Set the date for the time period requested
	var dates = getDates(fromYear, toYear, timeframe, quarter);
	
	var data = {
		fromDate: dates.from,
		toDate: dates.to,
		display: display,
		librarianID: librarian
	};
	if(statsType == "Student") {
		Aggregator.getStudentTotals(data, function(responseData) {
			res.send(responseData);
		});
	}
	else if(statsType == "Class") {
		Aggregator.getClassTotals(data, function(responseData) {
			res.send(responseData);
		});
	}
}

module.exports.getDataSearchClass = function(req, res) {

	if(!req.query.fromYear || !req.query.toYear || !req.query.searchTimeframe) {
		res.sendStatus(403);
		return 0;
	}

	var fromYear 	= req.query.fromYear;
	var toYear 		= req.query.toYear;
	var timeframe	= req.query.searchTimeframe;
	// Set optional 
	var librarian, quarter;
	if(typeof req.query.librarian != 'undefined') { librarian = req.query.librarian; }
	else { librarian = ""; }
	if(typeof req.query.quarter != 'undefined') { quarter = req.query.quarter; }
	else { quarter = ""; }

	// Set the date for the time period requested
	var dates = getDates(fromYear, toYear, timeframe, quarter);
	
	var data = {
		fromDate: dates.from,
		toDate: dates.to,
		librarianID: librarian
	};
	Aggregator.getClassData(data, function(responseData) {
		res.send(responseData);
	});
}