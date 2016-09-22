'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var Aggregator = require("../models/Aggregator.js")

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