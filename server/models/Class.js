'use strict'

var database = require('../util/database.js');
var collection;
var ObjectId = require('mongodb').ObjectID;

database.connect(function(db) {
	collection = db.collection('lisd_class');
});

exports.addDocument = function(data, callback) {

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
		// Insert the document
	    collection.insertOne(doc, function(err, result) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback({status: 'error', message: err});
		    }
		    else {
		    	console.log("DB Insert OK");
		    	callback({status: "ok", message: 'Inserted 1 document into the collection', data: result});
		    }
		    // db.close();
		});
	} catch (e) {
		callback({status: 'error', message: e});
	};
	//db.close();
}

/* 
* Return object of all available class property choices for libnrarian, location, and department
*/
exports.getList = function(callback) {
	var classes = [];

	try {
		var cursor = collection.find({ "isActive": true }, {"_id": 1, "courseInfo.name": 1});
        cursor.each(function(err, item) {
        	if(item != null) {
        		classes.push(item);
        	}
        	else {
        		callback({status: "ok", message: "Ok", data: classes});
        	}
        });
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
}

exports.getData = function(classID, callback) {

	try {
		var result = [];
		var cursor = collection.find({ "_id": ObjectId(classID) }, {});
        cursor.each(function(err, item) {
        	if(item != null) {
        		result.push(item);
        	}
        	else {
        		var classData = {};

        		// Strings
        		classData['name'] = result[0].courseInfo.name || "Not found";
        		classData['number'] = result[0].courseInfo.number || 0;
        		classData['instructor'] = result[0].courseInfo.instructor || "Not found";
        		classData['quarter'] = result[0].courseInfo.quarter || 0;
        		classData['date'] = result[0].courseInfo.date || new Date();
        		classData['undergraduates'] = result[0].enrollmentInfo.undergraduates || 0;
        		classData['graduates'] = result[0].enrollmentInfo.graduates || 0;
        		classData['faculty'] = result[0].enrollmentInfo.faculty || 0;
        		classData['other'] = result[0].enrollmentInfo.other || 0;

        		// Properties - arrays
        		classData['librarians'] = result[0].associatedLibrarians || [];
        		classData['departments'] = result[0].department || [];
        		classData['locations'] = result[0].location || [];

        		// Arrays
        		classData['acrlFrameworks'] = result[0].acrlFrame || [];
        		classData['types'] = result[0].type || [];
        		classData['comments'] = result[0].comments || [];

        		callback({status: "ok", message: "Ok", data: classData});
        	}
        });
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
};

exports.getClassComments = function(classID, callback) {

	try {
		var results = [];
		var cursor = collection.find({ "_id": ObjectId(classID) }, {"_id": 0, "comments": 1});
        cursor.each(function(err, item) {
        	if(item != null) {
        		results.push(item);
        	}
        	else {
        		callback({status: "ok", message: "Ok", data: results[0].comments});
        	}
        });
	}
	catch (e) {
		callback({status: "error", message: "Error: " + e});
	}
};

exports.appendComment = function(classID, commentData, callback) {

	this.getClassComments(classID, function(comments) {

		var comment = comments.data, commentsArr = [];
		if(typeof comments.data.length != 'undefined') {
			commentsArr = comments.data;
		}

		commentsArr.push({
			name: commentData.name,
			text: commentData.comment
		});

		try {
			// Insert the document
		    collection.updateOne({"_id": ObjectId(classID)}, {$set: {comments: commentsArr}}, function(err, results) {
			    if(err) {
			    	console.log("Error: " + err);
			    	callback({status: "error", message: "Error: " + e});
			    }
			    else {
			    	console.log("Comment added to class ", classID);
			    	callback({status: "ok", message: "Ok", data: results});
			    }
			});
		} catch (e) {
			console.log("Error: " + e);
			callback({status: "error", message: "Error: " + e});
		};
	});
};

exports.updateComment = function(classID, commentIndex, comment, callback) {
	this.getClassComments(classID, function(comments) {

		comments.data[commentIndex].name = comment.name;
		comments.data[commentIndex].text = comment.comment;

		try {
		    collection.updateOne({"_id": ObjectId(classID)}, {$set: {comments: comments.data}}, function(err, results) {
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
	});
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
	    collection.updateOne({"_id": ObjectId(classID)}, {$set: doc}, function(err, results) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback({status: "error", message: "Error: " + e});
		    }
		    else {
		    	console.log("Class " + classID + " updated");
		    	callback({status: "ok", message: "Ok", data: results});
		    }
		});
	} catch (e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	};
};

exports.removeData = function(classID, callback) {

	try {
		collection.deleteOne({"_id": ObjectId(classID)}, function(err, results) {
		    if(err) {
		    	console.log("Error: " + err);
		    	callback({status: "error", message: "Error: " + e});
		    }
		    else {
		    	console.log("Class " + classID + " removed");
		    	callback({status: "ok", message: "Ok", data: results});
		    }
		});
	} catch(e) {
		console.log("Error: " + e);
		callback({status: "error", message: "Error: " + e});
	}
};

