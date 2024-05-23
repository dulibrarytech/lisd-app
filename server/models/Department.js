'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	var collection = {};
	var ObjectId = require('mongodb').ObjectId;

	console.log("Department model connecting to database..");
	database.connect()
		.then((db) => {
			if(!db) throw "Department database connection failed";
			else {
				console.log(`Department model connected to database: ${db}`);
				collection = db.collection('lisd_department');
			}
		})
		.catch(console.error)
		.finally(() => {
			// if(database) database.closeConnection();
		});

	var getList = async function(callback) {
		var results = {
			department: {}
		};

		try {
			var cursor = await collection.find({ "isActive": true }, {"_id": 1, "name": 1}).sort({name:1}).toArray();
			for(let item of cursor) {
				results.department[item._id] = item.name;
			};

			callback({status: "ok", message: "Ok", data: results});
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getAll = async function(callback) {
		try {
			var results = await collection.find({}, {"_id": 1, "name": 1, "isActive": 1}).sort({name:1}).toArray();
			callback({status: "ok", message: "Ok", data: results});
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getData = async function(id, callback) {

		try {
			var results = await collection.find({ "_id": new ObjectId(id) }, {"_id": 0, "name": 1, "isActive": 1}).toArray();
			callback({status: "ok", message: "Ok", data: results});
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var updateData = async function(id, data, callback) {

		try {
			let results = collection.updateOne({"_id": new ObjectId(id)}, {$set: data});
			console.log("Department " + id + " updated");
			callback({status: "ok", message: "Ok", data: results});

		} catch (e) {
			console.log("Error: " + e);
			callback({status: "error", message: "Error: " + e});
		};
	};

	var addData = async function(data, callback) {
		console.log("Data:", data);
		try {
			let result = await collection.insertOne(data);
			console.log("Added department " + result.insertedId.toString());
			callback({status: "ok", message: "Ok", data: result.insertedId.toString()});

		} catch (e) {
			console.log("Error: " + e);
			callback(false);
		};
	};

	var removeData = async function(id, callback) {

		try {
			let result = await collection.deleteOne({ "_id": new ObjectId(id)});
			console.log("Department " + id + " removed. " + result);
			callback({status: "ok", message: "Ok", data: true});

		} catch (e) {
			console.log("Error: " + e);
			callback(false);
		};
	};

	return {
		getList: function(callback) {
			getList(callback);
		},
		getAll: function(callback) {
			getAll(callback);
		},
		getData: function(id, callback) {
			getData(id, callback);
		},
		updateData: function(id, data, callback) {
			updateData(id, data, callback);
		},
		addData: function(data, callback) {
			addData(data, callback);
		},
		removeData: function(id, callback) {
			removeData(id, callback);
		}
	};

})()
