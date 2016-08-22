'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var aggregatorModel = require("../models/Aggregator.js");
 
describe("Aggregator", function(){
    describe("#getTotalStudents()", function(){

   	    var from = "2015";
        var to = "2016";
        var callback = function(results) {

        	console.log("cb");
        	it("should return an object", function(){
	            assert.isObject(results);
	        });

	        it("should return a value for totalStudents", function(){
	            expect(results).to.be.not.empty;
	        });
        };

        aggregatorModel.getTotalStudents(from, to, 0, 0, callback);

        //var results = aggregatorModel.getTotalStudents(from, to, 0, 0, callback);

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