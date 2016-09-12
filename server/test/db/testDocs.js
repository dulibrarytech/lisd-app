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
    associatedLibrarians: ["100"],
    location: ["202"],
    department: ["300"],
    classType: ["401"],
    comments: ["comment"]
});







db.lisd_class.insertOne({
	courseInfo: { 
          className: "Joboo",
          courseNumber: "A1234",
          instructor: "Sammy Swanson",
          dateCreated: new Date("2002-03-30")
    }
});










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
    }
});