'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var classModel = require("../models/Class.js");
 
describe("Class", function(){
    describe("#addDocument()", function(){

    	// Get a test course number
    	var randomCourseNum = Math.round(Math.random() * 100);
    	randomCourseNum = "test-" + randomCourseNum.toString();

    	var testDoc = {
    		courseInfo: {
    			className: "mocha 1",
    			courseNumber: randomCourseNum,
    			instructor: "John Teacher",
    			dateCreated: "2002-03-30"
    		},
    		enrollmentInfo: {

    		},
    		associatedLibrarians: ["111"],
    		location: ["222"],
    		department: ["333"],
    		classType: ["444"],
    		comments: [{}]
    	};

    	// it("should return an object", function(done){
	    //     classModel.addDocument(testDoc, function(results) {
	    //         assert.isObject(results);
	    //         console.log(results);
	    // 	    done();
	    //     }, done);
    	// });

    	it("should return a status of ok", function(done){
	        classModel.addDocument(testDoc, function(results) {
	            expect(results.status).to.equal('ok');
	    	    done();
	        }, done);
    	});
	});
});