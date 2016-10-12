'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	database.connect();
	

	var addDocument = function(data, callback) {

		var db = database.connection();
		var collection = db.collection('lisd_class');

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
	var getAllPropertyData = function(callback) {

		var db = database.connection();
		var librarianCollection = db.collection('lisd_librarian');
		var locationCollection = db.collection('lisd_librarian');
		var librarianCollection = db.collection('lisd_librarian');
		var propertyData = [];
		propertyData['librarian'] = [];
		propertyData['location'] = [];
		propertyData['department'] = [];

		try {
			var cursor = collection.find({}, {"_id": 1, "courseInfo.name": 1});
			// temp.forEach( function(resultDoc) { 
				
			// 	if(temp.objsLeftInBatch()>0) {
			// 		propertyData.push(resultDoc._id);
			// 	}
			// 	else {
			// 		callback({status: "ok", message: 'OK', data: propertyData});
			// 	}

			// });
			// console.log(collection.find( {}, { "_id": 1}).count(function(error, nbDocs) {

			//    callback(nbDocs);
			// }));
			// cursor.nextObject(function(err, item) {
	  //         callback(item);

	  //         db.close();
	  //       })

	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		propertyData.push(item);
	        	}
	        	else {
	        		callback(propertyData);
	        	}
	        });



			//callback(propertyData);
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}

		
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getClassPropertyData: function(callback) {
			getClassPropertyData(callback);
		}
	};
})()