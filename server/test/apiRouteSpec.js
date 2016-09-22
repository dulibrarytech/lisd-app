'use strict'

var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Server API", function(){
    describe("#GET /get/data/all", function(){
		it('should return status 200', function(done) {
		  chai.request(process.env.BASE_URL)
		    .get('/get/data/all')
		    .query({fromYear:'2015', toYear:'2016'})
		    .end(function(err, res){
		      expect(res).to.have.status(200);
		      done();
		    });
		});
	});

	// describe("#GET /get/data/librarian/:id", function(){
	// 	it('should return status 200', function(done) {
	// 	  chai.request(process.env.BASE_URL)
	// 	    .get('/get/data/librarian/1')
	// 	    .end(function(err, res){
	// 	      expect(res).to.have.status(200);
	// 	      done();
	// 	    });
	// 	});
	// });

	describe("#POST /insert/class", function(){

		var data = {
			className: "MOCHA POST TEST - DELETE THIS RECORD",
			courseNumber: "test-12345",
			instructor: "Test Teacher",
			dateCreated: "2000-12-25",
			undergraduates: "21",
			graduates: "3",
			faculty: "5",
			other: "2",
			librarian1: "57e1f8bfadb181f4aec01010",
			librarian2: "57e1f8bfadb181f4aec00000",
		    location1: "57e1f8bfadb181f4aec01011",
		    department1: "57e1f8bfadb181f4aec01111",
		    classType1: "57e1f8bfadb181f4aec01111",
		    comment: {name: "commenter", text: "comment"}
		}

		it('should return status 200', function() {
		  chai.request(process.env.BASE_URL)
		    .post('/insert/class')
		    .send(data)
		    .end(function(err, res){
		      expect(res).to.have.status(200);
		      //done();
		    });
		});
	});
});