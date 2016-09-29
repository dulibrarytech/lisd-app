import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class EntryForm {

    // Form control variables
    librarianCount = 1;
    newLibrarianValue = [];
    locationCount = 1;
    newLocationValue = [];
    departmentCount = 1;
    newDepartmentValue = [];
    classTypeCount = 1;
    newClassTypeValue = [];

	// Load dropdown data 
    librarianList = this.getDropdownList('librarian');
    locationList = this.getDropdownList('location');
    departmentList = this.getDropdownList('department');
    classTypeList = this.getDropdownList('classType');

    // Add additional select input
    addLibrarian() {
		var newValue = "librarian" + (++this.librarianCount);
    	this.newLibrarianValue.push(newValue);
    }

    // Add additional select input
    addLocation() {
		var newValue = "location" + (++this.locationCount);
    	this.newLocationValue.push(newValue);
    }

    // Add additional select input
    addDepartment() {
		var newValue = "department" + (++this.departmentCount);
    	this.newDepartmentValue.push(newValue);
    }

    // Add additional select input
    addLibrarian() {
		var newValue = "classType" + (++this.classTypeCount);
    	this.newClassTypeValue.push(newValue);
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
	      list.push({name: "AAC 275", id: "12345"});
	      list.push({name: "AAC 275", id: "23456"});
	      list.push({name: "AAC 275", id: "34567"});
	  }
	  else {
	  	list.push("error");
	  }

      return list;
    };

    selectOption(dataSet) {
    	console.log("sel option");
    }

    submit() {
    	console.log("sel:");
    	console.log(this.newLibrarianValue);
    }
}

