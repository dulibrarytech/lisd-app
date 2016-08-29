'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")

exports.getDataAll = function(req, res) {

	// var allResults = [];
	// var maxLength = Object.keys(aggregatorModel).length;
	var response = res;
	var fromYear = '2015', toYear = '2016';

	var data = {
		fromDate: fromYear + '-' + settings.fiscalYearStart,
		toDate: toYear + '-' + settings.fiscalYearEnd,
		listByMonth: 0,
		librarianID: 0
	};

	var sendResponse = function(results) {
		response.send(results);
		//done();

	};

	//aggregatorModel.getAllData(data, sendResponse);
};

exports.getDataByLibrarian = function() {

};