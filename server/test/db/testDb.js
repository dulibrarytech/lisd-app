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
var classType1 = db.lisd_classType.insertOne({
	"name" : "Undergraduate",
	"isActive" : true
});
var classType2 = db.lisd_classType.insertOne({
	"name" : "Graduate",
	"isActive" : true
});
var classType3 = db.lisd_classType.insertOne({
	"name" : "Workshop",
	"isActive" : true
});

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
    associatedLibrarians: [librarian1.insertedId],
    location: [location2.insertedId],
    department: [department2.insertedId],
    classType: [classType3.insertedId],
    comments: [{ name: "Bill B.", text: "class comment"}]
});
