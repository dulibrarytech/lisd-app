'use strict'

var database = require('../util/database.js');
var collection;
var ObjectId = require('mongodb').ObjectID;

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

	try {
		var results = [];
		var cursor = collection.find({}, {"_id": 1, "name": 1, "isActive": 1}).sort({name:1});
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
};

exports.getData = function(id, callback) {

	try {
		var results = [];
		var cursor = collection.find({ "_id": ObjectId(id) }, {"_id": 0, "name": 1, "isActive": 1});
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
};

exports.updateData = function(id, data, callback) {

	try {
		// Insert the document
	    collection.updateOne({"_id": ObjectId(id)}, {$set: data}, function(err, results) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback({status: "error", message: "Error: " + e});
		    }
		    else {
		    	console.log("Location " + id + " updated");
		    	callback({status: "ok", message: "Ok", data: results});
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.addData = function(data, callback) {
	try {
		// Insert the document
	    collection.insertOne(data, function(err, result) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback(false);
		    }
		    else {
		    	console.log("Added location " + result.ops[0]._id);
		    	callback(result.ops[0]._id.toString());
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback(false);
	};
};

exports.removeData = function(id, callback) {

	try {
		// Insert the document
	    collection.deleteOne({ "_id": ObjectId(id)}, function(err, result) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback(false);
		    }
		    else {
		    	console.log("Location " + userID + " removed " + result);
		    	callback(true);
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback(false);
	};
};
