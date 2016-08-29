'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")

exports.getDataAll = function(req, res) {

	var response = res;
	var fromYear = '2015', toYear = '2016';

	var data = {
		fromDate: fromYear + '-' + settings.fiscalYearStart,
		toDate: toYear + '-' + settings.fiscalYearEnd,
		listByMonth: 0,
		librarianID: 0
	};

	var sendResponse = function(responseData) {
		response.send(responseData);
		//done();
	};

	aggregatorModel.getAllData(data, sendResponse);
};

exports.getDataByLibrarian = function() {

};