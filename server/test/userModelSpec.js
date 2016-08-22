var expect = require("chai").expect;
var userModel = require("../models/User.js");
 
describe("User", function(){
   describe("#isValidSession()", function(){
       it("should return true", function(){
       	
           var session = {
           		token: "12345"
           };
           var valid = userModel.isValidSession(session);
           expect(valid).to.equal(true);
       });
   });
});