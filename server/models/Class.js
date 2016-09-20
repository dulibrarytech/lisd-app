'use strict'

module.exports = (function() {

	var database;

	var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  database = db;
	  //db.close();
	});

	var addDocument = function(doc, callback) {

		var date = new Date(doc.courseInfo.dateCreated);
		doc.courseInfo.dateCreated = date;
		console.log("add");

		// Insert the document
		try {

		   //database.db.lisd_class.insertOne(doc);
		   callback({status: 'ok'});
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