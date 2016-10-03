import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class EntryForm {

    // Form control variables
    librarianCount = 1;
    selectedLibrarians = [];
    locationCount = 1;
    selectedLocations = [];
    departmentCount = 1;
    selectedDepartments = [];
    classTypeCount = 1;
    selectedClassTypes = [];

    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

	// Load dropdown data 
    librarianList = this.getDropdownList('librarian');
    locationList = this.getDropdownList('location');
    departmentList = this.getDropdownList('department');
    classTypeList = this.getDropdownList('classType');

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

    // Add additional select input
    addClassType() {
		var newValue = "classType" + (++this.classTypeCount);
    	this.selectedClassTypes.push(newValue);
    	document.getElementById("add-classType").style.visibility = "hidden";
    }

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

    selectOption(val) {
    	document.getElementById(val).style.visibility = "visible";	
    }

    submit() {

    	var formData = {};

    	formData['librarian'] = this.selectedLibrarians;
    	formData['location'] = this.selectedLocations;
    	formData['department'] = this.selectedDepartments;
    	formData['classType'] = this.selectedClassTypes;

    	console.log(formData);
    }
}

