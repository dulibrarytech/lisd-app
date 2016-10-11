import 'fetch';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

@inject(HttpClient)

export class EntryForm {

    // Form control variables
    librarianCount = 1;
    selectedLibrarians = [];
    locationCount = 1;
    selectedLocations = [];
    departmentCount = 1;
    selectedDepartments = [];

    selectedClassTypes = {};
    selectedAcrlFrames = {};

    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    classTypes = ['Undergraduate', 'Graduate', 'Faculty/Staff', 'Other'];

    acrlFrames = [

    	'Authority Is Constructed and Contextual',
    	'Information Creation as a Process',
    	'Information Has Value',
    	'Research as Inquiry',
    	'Scholarship as Conversation',
    	'Searching as Strategic Exploration'
    ]

    constructor(httpClient) {

        httpClient.configure(config => {
            config
                .withBaseUrl('http://localhost:9004/')
                .withDefaults({
                    headers: {
                        'Accept': 'application/json'
                    }
                });
        });

        this.http = httpClient;

        // Load dropdown data 
        this.librarianList = this.getDropdownList('librarian');
        this.locationList = this.getDropdownList('location');
        this.departmentList = this.getDropdownList('department');
        this.classTypeList = this.getDropdownList('classType');

        console.log(httpClient);
    }

    // Add additional select input
    addLibrarian() {
		var newValue = "librarian" + (++this.librarianCount);
    	this.selectedLibrarians.push(newValue);
    	document.getElementById("add-librarian").style.visibility = "hidden";
    }

    // Add additional select input
    addLocation() {
		var newValue = "location" + (++this.locationCount);
    	this.selectedLocations.push(newValue);
    	document.getElementById("add-location").style.visibility = "hidden";
    }

    // Add additional select input
    addDepartment() {
		var newValue = "department" + (++this.departmentCount);
    	this.selectedDepartments.push(newValue);
    	document.getElementById("add-department").style.visibility = "hidden";
    }

  //   // Add additional select input
  //   addClassType() {
		// var newValue = "classType" + (++this.classTypeCount);
  //   	this.selectedClassTypes.push(newValue);
  //   	document.getElementById("add-classType").style.visibility = "hidden";
  //   }

  //   addACRLFrame(frame) {
  //   	console.log(frame);
  //   }

    // Retrieves the current list from the server
    getDropdownList(dataSet) {
      var list = [];

      // DEV
      if(dataSet == 'librarian') {
	      list.push({name: "John", id: "12345"});
	      list.push({name: "Jane", id: "23456"});
	      list.push({name: "June", id: "34567"});
	  }
	  else if(dataSet == 'location') {
	      list.push({name: "AAC 275", id: "12345"});
	      list.push({name: "AAC 340", id: "23456"});
	      list.push({name: "AAC 313", id: "34567"});
	  }
	  else if(dataSet == 'department') {
	      list.push({name: "Biology", id: "12345"});
	      list.push({name: "Chemistry", id: "23456"});
	      list.push({name: "History", id: "34567"});
	  }
	  else if(dataSet == 'classType') {
	      list.push({name: "Undergraduate", id: "12345"});
	      list.push({name: "Graduate", id: "23456"});
	      list.push({name: "Other", id: "34567"});
	  }
	  else {
	  	list.push("error");
	  }

      return list;
    };

    getFormData() {

        var formData = {};

        // Form text fields
        formData['classDate'] = this.classDate;
        formData['quarter'] = this.quarterSelect;
        formData['className'] = this.className;
        formData['courseNumber'] = this.courseNumber;
        formData['instructorName'] = this.instructorName;
        formData['graduates'] = this.numGraduates;
        formData['undergraduates'] = this.numUndergraduates;
        formData['facultyStaff'] = this.numFacultyStaff;
        formData['other'] = this.numOther;

        // Get dropdown select data
        formData['librarian'] = this.selectedLibrarians;
        formData['location'] = this.selectedLocations;
        formData['department'] = this.selectedDepartments;

        // Get checkbox group data
        formData['classType'] = [];
        formData['acrlFrame'] = [];
        for(var key in this.selectedClassTypes) {
            if(this.selectedClassTypes[key] == true) {
                formData['classType'].push(key);
            }
        }
        for(var key in this.selectedAcrlFrames) {
            if(this.selectedAcrlFrames[key] == true) {
                formData['acrlFrame'].push(key);
            }
        }

        formData['commentText'] = this.commentText;

        return formData;
    }

    selectOption(val) {
    	document.getElementById(val).style.visibility = "visible";	
    	//console.log(document.getElementById(val).value);
    }

    submit() {

    	var data = this.getFormData();

        // Ajax
        this.http.fetch('insert/class', {
            method: 'post',
            body: json(data)
        })
        .then(response => response.json())
        .then(data => {
                console.log("Server: " + data.message);
        })
    }
}

