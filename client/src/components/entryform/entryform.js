import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class EntryForm {

    // Load dropdown data 
    librarianCount = 1;
    librarianList = this.getDropdownList('librarian');
    newLibrarianValue = [];

    locationCount = 1;
    locationList = this.getDropdownList('location');
    departmentCount = 1;
    departmentList = this.getDropdownList('department');
    classTypeCount = 1;
    classTypeList = this.getDropdownList('classType');

    // From data variables
    librarianSelect;

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
	      list.push("AAC 275");
	      list.push("AAC 340");
	      list.push("AAC 313");
	  }
	  else if(dataSet == 'department') {
	      list.push("Biology");
	      list.push("Chemistry");
	      list.push("History");
	  }
	  else if(dataSet == 'classType') {
	      list.push("Undergrad");
	      list.push("Grad");
	      list.push("Other");
	  }
	  else {
	  	list.push("error");
	  }
      console.log(list);
      return list;
    };

    addLibrarian() {

		var newValue = "librarian" + (++this.librarianCount);
    	this.newLibrarianValue.push(newValue);
    }

    selectOption(dataSet) {
    	console.log("sel option");
    }

    submit() {
    	console.log("sel:");
    	console.log(this.newLibrarianValue);
    }
}

