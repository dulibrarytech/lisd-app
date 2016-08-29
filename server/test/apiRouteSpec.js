'use strict'

var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// describe("Server API", function(){
//     describe("#GET /get/data/all", function(){
// 		it('should return status 200', function(done) {
// 		  chai.request(process.env.BASE_URL)
// 		    .get('/get/data/all')
// 		    .end(function(err, res){
// 		      expect(res).to.have.status(200);
// 		      done();
// 		    });
// 		});
// 	});

// 	// describe("#GET /get/data/librarian/:id", function(){
// 	// 	it('should return status 200', function(done) {
// 	// 	  chai.request(process.env.BASE_URL)
// 	// 	    .get('/get/data/librarian/1')
// 	// 	    .end(function(err, res){
// 	// 	      expect(res).to.have.status(200);
// 	// 	      done();
// 	// 	    });
// 	// 	});
// 	// });
// });