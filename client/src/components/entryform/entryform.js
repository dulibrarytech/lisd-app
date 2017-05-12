import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from '../../utils/SystemUtils.js';
import {Configuration} from '../../../config/configuration';
import $ from 'jquery'; // for datepicker

@inject(SystemUtils, Configuration)
export class EntryForm {

    ajax;
    config;

    // Form control variables
    librarianCount = 1;
    selectedLibrarians = [];
    locationCount = 1;
    selectedLocations = [];
    departmentCount = 1;
    selectedDepartments = [];

    selectedClassType = 'Undergraduate';
    selectedAcrlFrames = {};

    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    classTypes = ['Undergraduate', 'Graduate', 'Graduate-Undergraduate', 'Workshop', 'Orientation'];

    acrlFrames = [

    	'Authority Is Constructed and Contextual',
    	'Information Creation as a Process',
    	'Information Has Value',
    	'Research as Inquiry',
    	'Scholarship as Conversation',
    	'Searching as Strategic Exploration'
    ];

    constructor(systemUtils, configuration) {

        this.utils = systemUtils;
        this.config = configuration;

        this.librarianList = [];
        this.locationList = [];
        this.departmentList = [];

        this.loadDropdownData();
        // console.log("DDTEST:");
        // console.log(dropdownData.librarians[1]);
        // this.librarianList = dropdownData.librarians;
        // this.locationList = dropdownData.locations;
        // this.departmentList = dropdownData.departments;

        this.librarianList.push({"id": "123", "name": "TTT"});

        // console.log("entryform session:");
        // console.log(this.config.session.data);
        // console.log("List:");
        // console.log(this.librarianList);
        // console.log("List 0:");
        // console.log(this.librarianList[1]);
        // if(this.config.session.data) {  // if(this.config.session.data)
        //     console.log("Have session");
        // }
    }

    attached() {
        // var dropdownData = this.getDropdownData();
        // this.librarianList = dropdownData.librarians;
        // this.locationList = dropdownData.locations;
        // this.departmentList = dropdownData.departments;
        
        // console.log("entryform session:");
        // console.log(this.config.session);
        // if(true) {  // if(this.config.session.data)

        // }
        // if(this.config.session.data) {  // if(this.config.session.data)
        //     console.log("Have session");
        //     this.setActiveLibrarian();
        // }
        // else {
        //     console.log("No session");
        // }
    }

    // Add additional select input
    addLibrarian() {
		var newValue = "librarian" + (++this.librarianCount);
    	this.selectedLibrarians.push(newValue);
    	document.getElementById("librarian-add").style.visibility = "hidden";
    }

    removeLibrarian(index) {
        this.librarianCount--;
        this.selectedLibrarians.splice(index,1);
        document.getElementById("librarian-add").style.visibility = "visible";
    }

    // Add additional select input
    addLocation() {
		var newValue = "location" + (++this.locationCount);
    	this.selectedLocations.push(newValue);
    	document.getElementById("location-add").style.visibility = "hidden";
    }

    removeLocation(index) {
        this.locationCount--;
        this.selectedLocations.splice(index,1);
        document.getElementById("location-add").style.visibility = "visible";
    }

    // Add additional select input
    addDepartment() {
		var newValue = "department" + (++this.departmentCount);
    	this.selectedDepartments.push(newValue);
    	document.getElementById("department-add").style.visibility = "hidden";
    }

    removeDepartment(index) {
        this.departmentCount--;
        this.selectedDepartments.splice(index,1);
        document.getElementById("department-add").style.visibility = "visible";
    }

    // Retrieves the current list from the server and populates all select dropdowns
    loadDropdownData() {

        // var data = {};

        // // Select elements
        // data["librarians"] = [];
        // data["locations"] = [];
        // data["departments"] = [];

        // console.log("GDD test");
        //     console.log(this);

        console.log("Loading dropdown data");

        // Ajax
        this.utils.doAjax('get/data/entry/selectValues', 'get', null, null).then(responseObject => {

            this.utils.stopSpinner();
            console.log("GDD test");
            console.log(this);
            this.setSelectOptions(responseObject);
            console.log('Length');
            console.log(this.librarianList.length);

            if(this.config.session.data) {  // if(this.config.session.data)
                console.log("Have session");
                this.setActiveLibrarian();
            }
            else {
                console.log("No session");
            }
        });

        // return data;
    };

    setSelectOptions(options) {
        var currentData = {};
        for(var key in options) {
            if(key == 'librarian') {
                currentData = options[key];
                for(var dataItem in currentData) {
                    this.librarianList.push({
                        name: currentData[dataItem],
                        id: dataItem
                    });
                }
            }
            else if(key == 'location') {
                currentData = options[key];
                for(var dataItem in currentData) {
                    this.locationList.push({
                        name: currentData[dataItem],
                        id: dataItem
                    });
                }
            }
            else if(key == 'department') {
                currentData = options[key];
                for(var dataItem in currentData) {
                    this.departmentList.push({
                        name: currentData[dataItem],
                        id: dataItem
                    });
                }
            }
        }
        console.log("SO length");
        console.log(this.librarianList.length);
    }

    setActiveLibrarian() {
        // Get session user id
        // loop liblist ids to find active librarian
        console.log("SAL test");
        console.log(this.config.session.data._id);
        console.log(this.librarianList[1]);
    }

    // Return an object of all form data
    getFormData() {

        var formData = {};

        // Form text fields
        formData['classDate'] =         this.classDate;

        if(this.quarterSelect == "Fall") {formData['quarter'] = "1";}
        else if(this.quarterSelect == "Winter") {formData['quarter'] = "2";}
        else if(this.quarterSelect == "Spring") {formData['quarter'] = "3";}
        else if(this.quarterSelect == "Summer") {formData['quarter'] = "4";}

        formData['className'] =         this.className;
        formData['courseNumber'] =      this.courseNumber;
        formData['instructorName'] =    this.instructorFName + " " + this.instructorLName;
        formData['graduates'] =         this.numGraduates;
        formData['undergraduates'] =    this.numUndergraduates;
        formData['facultyStaff'] =      this.numFacultyStaff;
        formData['other'] =             this.numOther;

        // Get dropdown select data
        formData['librarian'] =     this.selectedLibrarians;
        formData['location'] =      this.selectedLocations;
        formData['department'] =    this.selectedDepartments;

        // Get checkbox group data
        formData['classType'] = [this.selectedClassType];
        formData['acrlFrame'] = [];

        // for(var key in this.selectedClassTypes) {
        //     if(this.selectedClassTypes[key] == true) {
        //         formData['classType'].push(key);
        //     }
        // }

        for(var key in this.selectedAcrlFrames) {
            if(this.selectedAcrlFrames[key] == true) {
                formData['acrlFrame'].push(key);
            }
        }

        formData['commentText'] = this.commentText;
        
        return formData;
    }

    selectOption(section) {
    	document.getElementById(section + "-add").style.visibility = "visible";	
    }

    submit() {

        var data = this.getFormData();        
        this.utils.doAjax('class/add', 'post', data, null).then(responseObject => {
            console.log("Class insert: Server: " + responseObject.message);
            setTimeout(function() {
                location.reload(false);
            }, 3000);
        });
    }
}

