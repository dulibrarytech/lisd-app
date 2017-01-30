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

// Data for the entry form
module.exports.getDataEntrySelectValues = function(req, res) {

	var response = res;
	//var responseData = [];
	var responseObject = {};
	var count = 0;
	var queryModules = [Librarian, Location, Department];

	// Callback for getList responseData, send data when all requests are complete
	var sendResponse = function(responseData) {
		
		if(responseData.status == "ok") {
			for(var key in responseData.data) {
				responseObject[key] = responseData.data[key];
			}
			count++;
		}

		if(count >= queryModules.length) {
			//console.log("sending response:");
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
		queryModules[key].getList(sendResponse);
	}
}

