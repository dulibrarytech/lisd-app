'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")


exports.getAllData = function(req, res) {

	var allResults = [];
	var maxLength = Object.keys(aggregatorModel).length;
	var response = res;

	// TODO get data from req
	var data = {
		fromYear: '2015',
		toYear: '2016',
		listByMonth: 0,
		librarianID: 0
	};

	var sendResponse = function(results) {
		allResults.push(results);	// TODO add under separate keys for each function return
		if(allResults.length >= maxLength) {
			response.send(allResults);
			//done();
		}
	};

	// aggregatorModel.getTotalStudents(data, sendResponse);
	// aggregatorModel.getDepartmentTotals(data, sendResponse);

	for(var key in aggregatorModel) {
		aggregatorModel[key](data, sendResponse);
	}

	//console.log(aggregatorModel);

	//res.send({test:12345});
};

exports.getStatsByMonth = function() {

};