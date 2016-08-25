'use strict'

var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Server API", function(){
    describe("#GET /get/data/all", function(){
		it('should return status 200', function(done) {
		  chai.request('http://localhost:9004')
		    .get('/get/data/all')
		    .end(function(err, res){
		      expect(res).to.have.status(200);
		      done();
		    });
		});
	});
});