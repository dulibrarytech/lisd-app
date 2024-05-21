'use strict'

var database = require('../util/database.js');
var collection = {};
var ObjectId = require('mongodb').ObjectId;

console.log("Class model connecting to database..");
database.connect()
	.then((db) => {
		if(!db) throw "Class database connection failed";
		else {
			console.log(`Class model connected to database: ${db}`);
			collection = db.collection('lisd_class');
		}
	})
	.catch(console.error)
	.finally(() => {
		// if(database) database.closeConnection();
	});

exports.addDocument = async function(data, callback) {
	var doc = { 
		courseInfo: { 
			name: data.className, 
			number: data.courseNumber, 
			instructor: data.instructor, 
			quarter: data.quarter, 
			date: new Date(data.date) 
		}, 
		enrollmentInfo: {
		    undergraduates: data.undergraduates, 
		    graduates: data.graduates, 
		    faculty: data.faculty, 
		    other: data.other 
		}, 
		associatedLibrarians: data.associatedLibrarians, 
		location: data.location, 
		department: data.department, 
		type: data.type, 
		acrlFrame: data.acrlFrame,
		comments: data.comments
	};

	try {
		let result = await collection.insertOne(doc);
		if(result.acknowledged != true) throw `Class data could not be added. Data: ${doc}`;
		else callback({status: 'ok', message: 'Inserted 1 document into the collection'});

	} catch (e) {
		callback({status: 'error', message: e});
	};
}

/* 
* Return object of all available class property choices for libnrarian, location, and department
*/
exports.getList = async function(callback) {
	var classes = [];

	try {
		var cursor = await collection.find({ "isActive": true }, {"_id": 1, "courseInfo.name": 1}).toArray();

		for(let item of cursor) {
			classes.push(item);
		}

		callback({status: "ok", message: "Ok", data: classes});
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
}

exports.getData = async function(classID, callback) {
	try {
		var classData = {};
		var result = await collection.findOne({ "_id": new ObjectId(classID) });

		// Strings
		classData['name'] = result.courseInfo.name || "Not found";
		classData['number'] = result.courseInfo.number || 0;
		classData['instructor'] = result.courseInfo.instructor || "Not found";
		classData['quarter'] = result.courseInfo.quarter || 0;
		classData['date'] = result.courseInfo.date || new Date();
		classData['undergraduates'] = result.enrollmentInfo.undergraduates || 0;
		classData['graduates'] = result.enrollmentInfo.graduates || 0;
		classData['faculty'] = result.enrollmentInfo.faculty || 0;
		classData['other'] = result.enrollmentInfo.other || 0;

		// Properties - arrays
		classData['librarians'] = result.associatedLibrarians || [];
		classData['departments'] = result.department || [];
		classData['locations'] = result.location || [];

		// Arrays
		classData['acrlFrameworks'] = result.acrlFrame || [];
		classData['types'] = result.type || [];
		classData['comments'] = result.comments || [];

		callback({status: "ok", message: "Ok", data: classData});
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
};

exports.getClassComments = async function(classID) {
	try {
		var classData = await collection.findOne({ "_id": new ObjectId(classID) }, {"_id": 0, "comments": 1});
		return {status: "ok", message: "Ok", data: classData.comments};
	}
	catch (e) {
		return {status: "error", message: "Error: " + e};
	}
};

exports.appendComment = async function(classID, commentData, callback) {
	let comments = await this.getClassComments(classID);
	let comment = comments.data, commentsArr = [];

	if(typeof comment.length != 'undefined') {
		commentsArr = comment;
	}

	commentsArr.push({
		name: commentData.name,
		text: commentData.comment
	});

	try {
		// Insert the document
		let results = await collection.updateOne({"_id": new ObjectId(classID)}, {$set: {comments: commentsArr}});
		console.log("Comment added to class ", classID);
		callback({status: "ok", message: "Ok", data: results});

	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.updateComment = async function(classID, commentIndex, comment, callback) {
	let comments = await this.getClassComments(classID);

	comments.data[commentIndex].name = comment.name;
	comments.data[commentIndex].text = comment.comment;

	try {
		collection.updateOne({"_id": new ObjectId(classID)}, {$set: {comments: comments.data}}, function(err, results) {
			if(err) {
				console.log("Error: " + err);
				callback({status: "error", message: "Error: " + e});
			}
			else {
				console.log("Comment updates for class ", classID);
				callback({status: "ok", message: "Ok", data: results});
			}
		});
	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.updateData = function(classID, classData, callback) {
	var doc = { 
		courseInfo: { 
			name: classData.className, 
			number: classData.courseNumber, 
			instructor: classData.instructor, 
			quarter: classData.quarter, 
			date: new Date(classData.date) 
		}, 
		enrollmentInfo: {
		    undergraduates: classData.undergraduates, 
		    graduates: classData.graduates, 
		    faculty: classData.faculty, 
		    other: classData.other 
		}, 
		associatedLibrarians: classData.associatedLibrarians, 
		location: classData.location, 
		department: classData.department, 
		type: classData.type, 
		acrlFrame: classData.acrlFrame
	};

	try {
		// Insert the document
	    let results = collection.updateOne({"_id": new ObjectId(classID)}, {$set: doc});

		console.log("Class " + classID + " updated");
		callback({status: "ok", message: "Ok", data: results});

	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.removeData = async function(classID, callback) {
	try {
		let results = await collection.deleteOne({"_id": new ObjectId(classID)});

		console.log("Class " + classID + " removed");
		callback({status: "ok", message: "Ok", data: results});

	} catch(e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	}
};

