'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")



// exports.getData = function(req, res) {

// }



exports.getAllData = function(req, res) {

	var allResults = [];
	var maxLength = Object.keys(aggregatorModel).length;
	var response = res;
	var fromYear = '2015', toYear = '2016';

	// TODO get data from req.  Set data, pass whole date into model.
	// var fromDate = fromYear + '-' + settings.fiscalYearStart; // ***TODO 	MOVE THESE UP TO THE CONTROLLER!!  REMOVE DOTENV INCLUDES!
	// var toDate = toYear + '-' + settings.fiscalYearEnd;
	var data = {
		fromDate: fromYear + '-' + settings.fiscalYearStart,
		toDate: toYear + '-' + settings.fiscalYearEnd,
		listByMonth: 0,
		librarianID: 0
	};

	var appendDataToResponseObject = function(data) {
		// Loop keys of data object, adding each key and its data to the main results object
		for(var key in data) {

		}
	}

	var sendResponse = function(results) {
		allResults.push(results);	// TODO add under separate keys for each function return
		//appendDataToResponseObject(results);
		if(allResults.length >= maxLength) {
			response.send(allResults);
			//done();
		}
	};

	// Aggregate data from DB model (Async)
	for(var key in aggregatorModel) {
		aggregatorModel[key](data, sendResponse);
	}
};

exports.getStatsByMonth = function() {

};