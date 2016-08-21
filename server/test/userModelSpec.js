var expect = require("chai").expect;
var userModel = require("../models/User.js");
 
describe("User", function(){
   describe("#isValidSession()", function(){
       it("should return true", function(){
       	
           var valid = userModel.isValidSession();
           expect(valid).to.equal(true);
       });
   });
});