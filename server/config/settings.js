'use strict';

var settings = {

	server: {
		fiscalYearStart: 		"07-01",
		fiscalYearEnd: 			"06-30",

		academicYearStart: 		"09-01",
		academicYearEnd: 		"08-30",

		quarter1Start: 			"09-01",
		quarter1End: 			"12-15",
		quarter2Start: 			"01-01",
		quarter2End: 			"03-15",
		quarter3Start: 			"03-16",
		quarter3End: 			"06-15",
		quarter4Start: 			"06-16",
		quarter4End: 			"8-30"
	},

	test: {
		api: {
			runGetGetDataAll: 		true,
			runPostInsertClass: 	true
		},
		class: {
			
		}
	}
};

module.exports = settings;

