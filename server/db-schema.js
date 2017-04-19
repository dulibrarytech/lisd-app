db.createCollection( "lisd_class",
   {
      validator: { $and:
         [
            { "courseInfo.name" : { $type: "string" } },
            { "courseInfo.number" : { $type: 'string' } },
            { "courseInfo.instructor" : { $type: 'string' } },
            { "courseInfo.quarter" : { $type: 'string' } },
            { "courseInfo.date" : { $type: 'date' } },
            { "enrollmentInfo.undergraduates" : { $type: 'number' } },
            { "enrollmentInfo.graduates" : { $type: 'number' } },
            { "enrollmentInfo.faculty" : { $type: 'number' } },
            { "enrollmentInfo.other" : { $type: 'number' } },
            { "associatedLibrarians": { $type : "string" } },
            { "location": { $type : "string" } },
            { "department": { $type : "string" } },
            { "type": { $type : "string" } },
            { "acrlFrame": { $type : "string" } },
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

db.createCollection( "lisd_user",
   {
      validator: { $and:
         [
            { "username" : { $type: "string" } },
            { "password" : { $type: "string" } },
            { "firstname" : { $type: "string" } },
            { "lastname" : { $type: "string" } },
            { "role" : { $type: "number" } },
            { "isActive" : { $type: "bool" } }
         ]
      },
      validationAction: "error"
   }
);

