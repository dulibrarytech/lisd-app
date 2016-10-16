'use strict'

var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Server API", function(){
    
	if(false) {
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
	}

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
	if(true) {
		describe("#GET /get/data/selectValues", function(){
			it('should return status 200', function(done) {
				chai.request(process.env.BASE_URL)
				    .get('/get/data/selectValues')
				    .end(function(err, res){
				      expect(res).to.have.status(200);
				      	console.log("TEST RESULTS: ");
				      for(var i=0; i<res.body.length; i++) {
				      	console.log(res.body[i].data);
				      }
				      done();
				    });
			});
		});
	}

	if(false) {
		describe("#POST /insert/class", function(){

			var data = {
				className: "MOCHA POST TEST - DELETE THIS RECORD",
				courseNumber: "test-12345",
				instructorName: "Test Teacher",
				classDate: "2000-12-25",
				quarter: "Fall",
				undergraduates: "21",
				graduates: "3",
				facultyStaff: "5",
				other: "2",
				librarian: ["57e1f8bfadb181f4aec01010", "57e1f8bfadb181f4aaa21221"],
			    location: ["57e1f8bfadb181f4aec01011"],
			    department: ["57e1f8bfadb181f4aec01111"],
			    classType: ["undergraduate"],
			    acrlFrame: ["Sample acrl frame name"],
			    commentText: "comment by commenter"
			}

			it('should return status 200', function() {
			  chai.request(process.env.BASE_URL)
			    .post('/insert/class')
			    .send(data)
			    .end(function(err, res){

			      console.log("ajax result: class inserted");
			    });
			});
		});
	}
});