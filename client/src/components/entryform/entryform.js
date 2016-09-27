import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class EntryForm {

    librarianCount = 1;
    librarian1;

    librarians = this.getLibrarianList();




   // Get data for dropdowns

   // Add handlers



    getLibrarianList() {

      var librarianList = [];

      // Get list from server
      librarianList.push("John");
      librarianList.push("Jane");
      librarianList.push("June");

      console.log(librarianList);

      return librarianList;
    };

    addLibrarian() {
    	this.librarianCount++;

    	// Append select element
    }

    submit() {
    	console.log(this.librarianCount);
    }
}

