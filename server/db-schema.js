db.createCollection( "lisd_class",
   {
      validator: { $and:
         [
            { "courseInfo.className" : { $type: "string" } },
            { "courseInfo.courseNumber" : { $type: 'string' } },
            { "courseInfo.instructor" : { $type: 'string' } },
            { "courseInfo.dateCreated" : { $type: 'date' } },
            { "enrollmentInfo.undergraduates" : { $type: 'number' } },
            { "enrollmentInfo.graduates" : { $type: 'number' } },
            { "enrollmentInfo.faculty" : { $type: 'number' } },
            { "enrollmentInfo.other" : { $type: 'number' } },
            { "associatedLibrarians": { $type : "string" } },
            { "location": { $type : "string" } },
            { "department": { $type : "string" } },
            { "classType": { $type : "string" } },
            { "comments": { $type : "object" } }
         ]
      },
      validationAction: "error"
   }
)

db.createCollection( "lisd_librarian",
   {
      validator: { $and:
         [
            { "name" : { $type: "string" } },
            { "isActive" : { $type: "bool" } }
         ]
      },
      validationAction: "error"
   }
);

db.createCollection( "lisd_department",
   {
      validator: { $and:
         [
            { "name" : { $type: "string" } },
            { "isActive" : { $type: "bool" } }
         ]
      },
      validationAction: "error"
   }
);

db.createCollection( "lisd_location",
   {
      validator: { $and:
         [
            { "name" : { $type: "string" } },
            { "isActive" : { $type: "bool" } }
         ]
      },
      validationAction: "error"
   }
);

db.createCollection( "lisd_classType",
   {
      validator: { $and:
         [
            { "name" : { $type: "string" } },
            { "isActive" : { $type: "bool" } }
         ]
      },
      validationAction: "error"
   }
);

