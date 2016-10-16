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
        var dropdownData = this.getDropdownData();
        this.librarianList = dropdownData.librarians;
        this.locationList = dropdownData.locations;
        this.departmentList = dropdownData.departments;

        console.log("dropdown data: ");
        console.log(dropdownData);
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

    // Retrieves the current list from the server
    getDropdownData() {

        var data = {};

        data["librarians"] = [];
        data["locations"] = [];
        data["departments"] = [];

        // // DEV
        // data["librarians"].push({name: "John", id: "12345"});
        // data["librarians"].push({name: "Jane", id: "23456"});
        // data["librarians"].push({name: "June", id: "34567"});

        // data["locations"].push({name: "AAC 275", id: "12345"});
        // data["locations"].push({name: "AAC 340", id: "23456"});
        // data["locations"].push({name: "AAC 313", id: "34567"});

        // data["departments"].push({name: "Biology", id: "12345"});
        // data["departments"].push({name: "Chemistry", id: "23456"});
        // data["departments"].push({name: "History", id: "34567"});

        // Ajax
        this.http.fetch('get/data/selectValues', {
            method: 'get'
        }).then(function(response) {
            return response.json();
          }).then(function(responseArray) { 
            // <!DOCTYPE ....
            console.log("here");
            //console.log(responseArray[1].data.location); 
            var data;

            for(var i in responseArray) {
               //data["librarians"].push(responseArray[i].data.
              console.log(responseArray[i].data);
               //librarians = responseArray[1].data.librarian;
               // for(var key in responseArray[i].data) {
               //      // data["librarians"].push({
               //      //     name: librarians.name,
               //      //     id: librarians
               //      // })
               //      console.log("under key:");
               //      console.log(responseArray[i].data[key]);
               //      // if(key == "librarian") {
               //      //     for(var key in responseArray[i].data) {
               //      //         console.log("hit");
               //      //         console.log(responseArray[i].data[key]);
               //      //     }
               //      // }
               // }
            }
          });

        return data;
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

