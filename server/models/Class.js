'use strict'

module.exports = (function() {

	var database;

	var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  database = db;

	  // var collection = db.collection('lisd_class');
	  // collection.insertOne([
	  //   {
   //  		courseInfo: {
   //  			className: "mocha 9999",
   //  			courseNumber: "9999",
   //  			instructor: "9999",
   //  			dateCreated: "2002-03-30"
   //  		},
   //  		enrollmentInfo: {
   //  			undergraduates: 20,
   //  			graduates: 2,
   //  			faculty: 4,
   //  			other: 1
   //  		},
   //  		associatedLibrarians: ["111"],
   //  		location: ["222"],
   //  		department: ["333"],
   //  		classType: ["444"],
   //  		comments: {}
   //  	}], function(err, result) {
	  //   assert.equal(err, null);
	  //   console.log("Inserted document into the collection");
	  //   //callback(result);
	  // });
	  //db.close();
	});

	var addDocument = function(doc, callback) {

		var collection = database.collection('lisd_class');
		var date = new Date(doc.courseInfo.dateCreated);
		doc.courseInfo.dateCreated = date;

		// Insert the document
		try {

		   collection.insertMany([
		    db.lisd_class.insertOne({
          courseInfo: {
            className: "mocha 9999",
            courseNumber: "9999",
            instructor: "9999",
            dateCreated: new Date("2002-03-30")
          },
          enrollmentInfo: {
            undergraduates: 20,
            graduates: 2,
            faculty: 4,
            other: 1
          },
          associatedLibrarians: [ObjectId("57d9aa0449d464352fb4846a")],
          location: [ObjectId("57d9aa0449d464352fb4846b")],
          department: [ObjectId("57d9aa0449d464352fb4846c")],
          classType: [ObjectId("57d9aa0449d464352fb4846d")],
          comments: [{ name: "Bill B.", text: "class comment"}]
        });
], function(err, result) {
		    assert.equal(err, null);
		    console.log("Inserted documents into the collection");
		    callback({status: 'ok'});
		  });
		   
		   //console.log(database);

		} catch (e) {

		   console.log(e); // .errmsg
		   callback({status: 'error'});
		};
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		}
	};
})()

// var database = require("../utils/Database.js").then(function(response) {
//   console.log("Success!", response);
// }, function(error) {
//   console.error("Failed!", error);
// });

// var addDocument = function(doc, callback) {

// 	var date = new Date(doc.courseInfo.dateCreated);
// 	doc.courseInfo.dateCreated = date;
// 	console.log("add");

// 	// Insert the document
// 	try {

// 	   //database.db.lisd_class.insertOne(doc);
// 	   callback({status: 'ok'});
// 	   //console.log(database);

// 	} catch (e) {

// 	   console.log(e); // .errmsg
// 	   callback({status: 'error'});
// 	};
// }