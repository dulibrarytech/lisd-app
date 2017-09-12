'use strict'

var database = require('../util/database.js');
var collection;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_location');
	// DEV
	//console.log("Location model connected to db...");
});

exports.getList = function(callback) {
	var results = {
		location: {}
	};

	try {
		var cursor = collection.find({ "isActive": true }, {"_id": 1, "name": 1}).sort({name:1});
        cursor.each(function(err, item) {
        	if(item != null) {
        		results.location[item._id] = item.name;
        	}
        	else {
        		callback({status: "ok", message: "Ok", data: results});
        	}
        });
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
};

exports.getAll = function(callback) {
	var results = [];

	try {
		var cursor = collection.find({}, {"_id": 0, "name": 1, "isActive": 1}).sort({name:1});
        cursor.each(function(err, item) {
        	if(item != null) {
        		results.push(item);
        	}
        	else {
        		callback({status: "ok", message: "Ok", data: results});
        	}
        });
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
}
