db.createCollection( "lisd_librarian",
   {
      validator: { $or:
         [
            { courseInfo: { $type: "string" } },
            { enrollmentInfo: { $regex: /@mongodb\.com$/ } },
            { associatedLibrarians: { $in: [ "Unknown", "Incomplete" ] } }
         ]
      },
      validationAction: "warn"
   }
)