var expect = require("chai").expect;
var userModel = require("../models/User.js");
 
describe("User", function(){
   describe("#sayHelloInEnglish()", function(){
       it("should return true", function(){
       	
           var results = userModel.sayHelloInEnglish();
           expect(results).to.equal(true);
       });
   });
});