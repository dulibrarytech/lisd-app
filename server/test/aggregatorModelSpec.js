'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var aggregatorModel = require("../models/Aggregator.js");
 
describe("Aggregator", function(){
    describe("#getTotalStudents()", function(){

   	    var from = "2015";
        var to = "2016";

		it("should return an array", function(done){
	        var results = aggregatorModel.getTotalStudents(from, to, 0, 0, function(results, done) {
	            assert.isArray(results);
	            //console.log(results);
	    		done();
	        }, 
	        done);

	        // it("should return an object", function(){
	        //     assert.isObject(results);
	        // });

	        // it("should return a value for totalStudents", function(){
	        //     expect(results).to.be.not.empty;
	        // });

	        // it("should return a number for totalStudents", function(){
	        //     expect(results.totalStudents).to.be.a('number');
	        // });
    	});
	});
});