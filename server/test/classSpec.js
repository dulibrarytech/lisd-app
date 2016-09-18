'use strict'

var expect = require("chai").expect;
var assert = require("chai").assert;
var classModel = require("../models/Class.js");
 
describe("Class", function(){
    describe("#addDocument()", function(){

    	var doc = {};

    	it("should return an object", function(done){
	        classModel.addDocument(doc, function(results) {
	            assert.isObject(results);
	            console.log(results);
	    	    done();
	        }, done);
    	});

    	it("should return a status of ok", function(done){
	        classModel.addDocument(doc, function(results) {
	            expect(results.status).to.equal('ok');
	    	    done();
	        }, done);
    	});
	});
});