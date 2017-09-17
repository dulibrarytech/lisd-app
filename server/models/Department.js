'use strict'

var database = require('../util/database.js');
var collection;
var ObjectId = require('mongodb').ObjectID;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_department');
	// DEV
	//console.log("Department model connected to db...");
});

exports.getList = function(callback) {
	var results = {
		department: {}
	};

	try {
		var cursor = collection.find({ "isActive": true }, {"_id": 1, "name": 1}).sort({name:1});
        cursor.each(function(err, item) {
        	if(item != null) {
        		results.department[item._id] = item.name;
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
		    	console.log("Department " + id + " updated");
		    	callback({status: "ok", message: "Ok", data: results});
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.addData = function(data, callback) {
	console.log("Data:", data);
	try {
		// Insert the document
	    collection.insertOne(data, function(err, result) {
		    if(err) {
		    	console.log("Errorr: " + err);
		    	callback({status: "ok", message: "Ok", data: null});
		    }
		    else {
		    	console.log("Added department " + result.ops[0]._id);
		    	callback({status: "ok", message: "Ok", data: result.ops[0]._id.toString()});
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
		    	callback({status: "error", message: "Error: " + e});
		    }
		    else {
		    	console.log("Department " + id + " removed. " + result);
		    	callback({status: "ok", message: "Ok", data: true});
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback(false);
	};
};
