'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var aggregatorModel = require("../models/Aggregator.js")

module.exports.getDataAll = function(req,res) {

	var response = res;
	var fromYear = req.query.fromYear, toYear = req.query.toYear;

	var data = {
		fromDate: fromYear + '-' + settings.fiscalYearStart,
		toDate: toYear + '-' + settings.fiscalYearEnd,
		listByMonth: 0,
		librarianID: 0
	};

	aggregatorModel.getAllData(data, function(responseData) {
		res.send(responseData)
	});
}