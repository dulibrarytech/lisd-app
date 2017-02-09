'use strict'

var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("Server API", function(){
    
	if(true) {
	    describe("#GET /get/data/all", function(){
			it('should return status 200', function() {
			  chai.request(process.env.BASE_URL)
			    .get('/get/data/all')
			    .send({fromYear:'2015', toYear:'2016'})
			    .end(function(err, res){
			      expect(res).to.have.status(200);
			      //done();
			    });
			});
		});
	}

	if(false) {
		describe("#GET /get/data/search/selectValues", function(){
			
			it('it should GET an object ', (done) => {

		        chai.request(process.env.BASE_URL)
		            .get('/get/data/search/selectValues')
		            .end((err, res) => {
		               res.should.have.status(200);
		                console.log(res.body);
		              done();
		            });
		      });
			
		});
	}

	if(false) {
		describe("#POST /insert/class", function(){

			// var data = {
			// 	className: "MOCHA POST TEST - DELETE THIS RECORD",
			// 	courseNumber: "test-12345",
			// 	instructorName: "Test Teacher",
			// 	classDate: "2000-12-25",
			// 	quarter: "Fall",
			// 	undergraduates: "21",
			// 	graduates: "3",
			// 	facultyStaff: "5",
			// 	other: "2",
			// 	librarian: ["57e1f8bfadb181f4aec01010", "57e1f8bfadb181f4aaa21221"],
			//     location: ["57e1f8bfadb181f4aec01011"],
			//     department: ["57e1f8bfadb181f4aec01111"],
			//     classType: ["undergraduate"],
			//     acrlFrame: ["Sample acrl frame name"],
			//     commentText: "comment by commenter"
			// }

			// it('should return status 200', function(done) {
			//   chai.request(process.env.BASE_URL)
			//     .post('/insert/class')
			//     .send(data)
			//     .end(function(err, res){

			//       expect(res).to.have.status(200);
			//       	console.log("received response:");
			//       	console.log(res.body);

			//       done();
			//     });
			// });

			it('it should POST a class ', (done) => {
		        let data = {
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
		        chai.request(process.env.BASE_URL)
		            .post('/insert/class')
		            .send(data)
		            .end((err, res) => {
		                res.should.have.status(200);
		                //res.body.should.be.a('object');
		                console.log(res.body);
		              done();
		            });
		      });

		});
	}

	if(false) {
		describe("#POST /admin/authenticate", function(){
			it('should return status 200', function(done) {

				var data = {
					username: "jrynhart",
					password: "12345"
				};
				chai.request(process.env.BASE_URL)
				    .post('/admin/authenticate')
				    .send(data)
				    .end(function(err, res){

			      		expect(res).to.have.status(200);
			      			console.log("received response:");
			      			console.log(res.body);
			   		done();
			    });
				//done();
			});
		});
	}
});