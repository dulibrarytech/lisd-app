'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var Aggregator = require("../models/Aggregator.js");
var Librarian = require("../models/Librarian");
var Location = require("../models/Location");
var Department = require("../models/Department");
 
describe("Aggregator", function(){
 //    describe("#getTotalStudents()", function(){

 //   	    var data = {
	// 		fromDate: '2015-07-01',
	// 		toDate: '2016-06-30',
	// 		listByMonth: 0,
	// 		librarianID: 0
	// 	}
	// 	it("should return an array", function(done){
	//         Aggregator.getAllData(data, function(results, done) {
	//             assert.isArray(results);
	//             //console.log(results);
	//     	    done();
	//         }, done);

 //    	});
	// });
	if(true) {
		describe("#Librarian.getList()()", function(){
			it("should return an object", function(){

				Librarian.getList(function(results) {
					assert.isObject(results);
					if(results.message) {console.log("MESSAGE: " + results.message);}
					console.log("TEST RESULTS: ");
					console.log(results);
				});
			});
		});
	}

	if(true) {
		describe("#Location.getList()()", function(){
			it("should return an object", function(){

				Location.getList(function(results) {
					assert.isObject(results);
					if(results.message) {console.log("MESSAGE: " + results.message);}
					console.log("TEST RESULTS: ");
					console.log(results);
				});
			});
		});
	}

	if(true) {
		describe("#Department.getList()()", function(){
			it("should return an object", function(){

				Department.getList(function(results) {
					assert.isObject(results);
					if(results.message) {console.log("MESSAGE: " + results.message);}
					console.log("TEST RESULTS: ");
					console.log(results);
				});
			});
		});
	}
});