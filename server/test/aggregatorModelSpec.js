'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var aggregatorModel = require("../models/Aggregator.js");
 
describe("Aggregator", function(){
    describe("#getTotalStudents()", function(){

   	    var data = {
			fromYear: '2015',
			toYear: '2016',
			listByMonth: 0,
			librarianID: 0
		}
		it("should return an array", function(done){
	        aggregatorModel.getTotalStudents(data, function(results, done) {
	            assert.isArray(results);
	    		done();
	        }, done);

    	});
	});
});