// Insert Librarians
var librarian1 = db.lisd_librarian.insertOne({
	"name" : "Jane Doe",
	"isActive" : true
});
var librarian2 = db.lisd_librarian.insertOne({
	"name" : "June Smith",
	"isActive" : true
});
var librarian3 = db.lisd_librarian.insertOne({
	"name" : "Ben Bosworth",
	"isActive" : false
});

// Insert departments
var department1 = db.lisd_department.insertOne({
	"name" : "Computer Science",
	"isActive" : true
});
var department2 = db.lisd_department.insertOne({
	"name" : "Biology",
	"isActive" : true
});
var department3 = db.lisd_department.insertOne({
	"name" : "Physics",
	"isActive" : true
});
var department4 = db.lisd_department.insertOne({
  "name" : "Mathematics",
  "isActive" : true
});

// Insert locations
var location1 = db.lisd_location.insertOne({
	"name" : "AAC 340B",
	"isActive" : true
});
var location2 = db.lisd_location.insertOne({
	"name" : "AAC 150D",
	"isActive" : false
});
var location3 = db.lisd_location.insertOne({
	"name" : "STURM 238",
	"isActive" : true
});

// Insert classTypes
// var classType1 = db.lisd_classType.insertOne({
// 	"name" : "Undergraduate",
// 	"isActive" : true
// });
// var classType2 = db.lisd_classType.insertOne({
// 	"name" : "Graduate",
// 	"isActive" : true
// });
// var classType3 = db.lisd_classType.insertOne({
// 	"name" : "Workshop",
// 	"isActive" : true
// });

// Insert individual courses
db.lisd_class.insertOne({
	courseInfo: { 
          className: "Joboo",
          courseNumber: "A1234",
          instructor: "Sammy Swanson",
          dateCreated: new Date("2002-03-30")
    },
    enrollmentInfo: {
          undergraduates: 21,
          graduates: 3,
          faculty: 0,
          other: 5
    },
    associatedLibrarians: [librarian1.insertedId.valueOf()],
    location: [location2.insertedId.valueOf()],
    department: [department2.insertedId.valueOf()],
    classType: [classType3.insertedId.valueOf()],
    comments: [{ name: "Bill B.", text: "class comment"}]
});

db.lisd_class.insertOne({
	courseInfo: { 
          className: "Calculus",
          courseNumber: "B2345",
          instructor: "Miss Muffett",
          dateCreated: new Date("1992-03-30")
    },
    enrollmentInfo: {
          undergraduates: 21,
          graduates: 3,
          faculty: 0,
          other: 5
    },
    associatedLibrarians: [librarian3.insertedId.valueOf()],
    location: [location2.insertedId.valueOf()],
    department: [department2.insertedId.valueOf()],
    classType: [classType1.insertedId.valueOf()],
    comments: [{ name: "Anonymous", text: "blah blah"}]
});

db.lisd_class.insertOne({
	courseInfo: { 
          className: "Canadian Bacon",
          courseNumber: "C3456",
          instructor: "Kevin Bacon",
          dateCreated: new Date("2000-01-07")
    },
    enrollmentInfo: {
          undergraduates: 12,
          graduates: 30,
          faculty: 4,
          other: 3
    },
    associatedLibrarians: [librarian2.insertedId.valueOf()],
    location: [location3.insertedId.valueOf()],
    department: [department1.insertedId.valueOf()],
    classType: [classType2.insertedId.valueOf()],
    comments: [{}]
});

db.lisd_class.insertOne({
	courseInfo: { 
          className: "Bowling 101",
          courseNumber: "D4567",
          instructor: "Chris Christopherson",
          dateCreated: new Date("2002-03-30")
    },
    enrollmentInfo: {
          undergraduates: 18,
          graduates: 0,
          faculty: 5,
          other: 0
    },
    associatedLibrarians: [librarian1.insertedId.valueOf(),librarian1.insertedId.valueOf()],
    location: [location1.insertedId.valueOf()],
    department: [department3.insertedId.valueOf()],
    classType: [classType1.insertedId.valueOf()],
    comments: [{ name: "Robin Reddferd", text: "this is my comment"}, { name: "Peter Bigg", text: "cest la vie"}]
});
