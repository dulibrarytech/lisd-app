'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")


exports.getAllData = function(req, res) {

	var allResults = [];
	var maxLength = Object.keys(aggregatorModel).length;
	var response = res;

	// TODO get data from req
	var from = '2015';
	var to = '2016';

	var sendResponse = function(results) {
		allResults.push(results);
		if(allResults.length >= maxLength) {
			response.send(allResults);
			//done();
		}
	};

	var data = {
		fromYear: from,
		toYear: to,
		listByMonth: 0,
		librarianID: 0
	};

	
	aggregatorModel.getTotalStudents(data, sendResponse);
	aggregatorModel.getDepartmentTotals(data, sendResponse);




	//res.send({test:12345});
};

exports.getStatsByMonth = function() {

};