'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var aggregatorModel = require("../models/Aggregator.js");
 
describe("Aggregator", function(){
    describe("#getTotalStudents()", function(){

   	    var data = {
			fromDate: '2015-07-01',
			toDate: '2016-06-30',
			listByMonth: 0,
			librarianID: 0
		}
		it("should return an array", function(done){
	        aggregatorModel.getAllData(data, function(results, done) {
	            assert.isArray(results);
	            console.log(results);
	    	    done();
	        }, done);

    	});
	});
});