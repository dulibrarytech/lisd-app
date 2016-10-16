'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var classModel = require("../models/Class.js");
 
describe("Class", function(){

	if(false) {
		describe("#addDocument()", function(){

	    	// Get a test course number
	    	var randomCourseNum = Math.round(Math.random() * 12345);
	    	randomCourseNum = "test-" + randomCourseNum.toString();

	    	// Test document to be inserted to the db
	        var testDoc = {

	    			className: "MOCHA TEST - DELETE THIS RECORD",
	    			courseNumber: randomCourseNum,
	    			instructor: "Test Teacher 2",
	    			quarter: "Fall",
	    			date: "2002-12-25",
	                undergraduates: 12,
	                graduates: 30,
	                faculty: 4,
	                other: 3,
		    		associatedLibrarians: ["57e1f8bfadb181f4aec01010"],
		    		location: ["57e1f8bfadb181f4aec01011"],
		    		department: ["57e1f8bfadb181f4aec01100"],
		    		type: ["undergraduate"],
		    		acrlFrame: ["This is a test frame name"],
		    		comments: [{name: "test", text:"test comment"}]
	    	};

	    	it("should return a status of ok", function(done){
		        classModel.addDocument(testDoc, function(results) {
		            expect(results.status).to.equal('ok');
	                if(results.message) {console.log("MESSAGE: " + results.message);}
		    	    done();
		        }, done);
	    	});
		});
	}

	if(false) {
		describe("#getList()", function(){
			it("should return an object", function(){
				classModel.getList(function(results) {

					//if(results && typeof results.message != 'undefined') {console.log("MESSAGE: " + results.message);}
					//assert.isObject(results, 'results is an object');
					expect(results.status).to.equal('ok');
	                if(results.message) {console.log("MESSAGE: " + results.message);}
					console.log("TEST RESULTS: ");
					console.log(results);

				});
			});
		});
	}
});