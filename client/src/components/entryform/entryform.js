import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class EntryForm {

    selectedVal = 3;

    librarians = this.getLibrarianList();




   // Get data for dropdowns

   // Add handlers



    getLibrarianList() {
      console.log("gll");
      var librarianList = [];

      librarianList.push("librarian 1");
      librarianList.push("librarian 2");
      librarianList.push("librarian 3");

      console.log(librarianList);

      return librarianList;
    };
}

