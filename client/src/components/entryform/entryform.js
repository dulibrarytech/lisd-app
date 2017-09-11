import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from '../../utils/SystemUtils.js';
import {Configuration} from '../../../config/configuration';
import {Router} from 'aurelia-router';
import $ from 'jquery'; // for datepicker

@inject(SystemUtils, Configuration, Router)
export class EntryForm {

    ajax;
    config;

    // Form control variables
    librarianCount = 1;
    selectedLibrarians = [];
    activeLibrarian = "";
    locationCount = 1;
    selectedLocations = [];
    departmentCount = 1;
    selectedDepartments = [];

    selectedClassType = 'Undergraduate';
    selectedAcrlFrames = {};

    activeSession;

    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    classTypes = ['Undergraduate', 'Graduate', 'Graduate-Undergraduate', 'Workshop', 'Orientation'];

    acrlFrames = [

    	'Authority Is Constructed and Contextual',
    	'Information Creation as a Process',
    	'Information Has Value',
    	'Research as Inquiry',
    	'Scholarship as Conversation',
    	'Searching as Strategic Exploration',
        'None'
    ];

    constructor(systemUtils, configuration, router) {

        this.utils = systemUtils;
        this.config = configuration;
        this.router = router;

        this.librarianList = [];
        this.locationList = [];
        this.departmentList = [];

        this.activeSession = false;
        if(this.config.session.data) {
            this.activeSession = true;
            this.username = this.config.session.data.fname + " " + this.config.session.data.lname;
        }

        this.loadDropdownData();
    }

    attached() {

        if(this.config.session.data && this.config.session.data.librarianID !== "") {
            this.activeLibrarian = this.config.session.data.librarianID;
         // Add to property selection array
            this.selectedLibrarians = [this.activeLibrarian];
            this.selectOption('librarian');
        }

        if(this.config.session.token == null) {
            document.getElementById('menulink-104').style.display = "none";
        }
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

        this.utils.doAjax('get/data/entry/selectValues', 'get', null, null).then(responseObject => {
            this.setSelectOptions(responseObject);
        });
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
    }

    // setActiveLibrarian(librarianID) {

    //     this.activeLibrarian = librarianID;

    //     // Add to property selection array
    //     this.selectedLibrarians = [this.activeLibrarian];
    // }

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
        formData['graduates'] =         this.numGraduates || 0;
        formData['undergraduates'] =    this.numUndergraduates || 0;
        formData['facultyStaff'] =      this.numFacultyStaff || 0;
        formData['other'] =             this.numOther || 0;

        // Get dropdown select data
        formData['librarian'] =     this.selectedLibrarians;
        formData['location'] =      this.selectedLocations;
        formData['department'] =    this.selectedDepartments;

        // Get checkbox group data
        formData['classType'] = [this.selectedClassType];
        formData['acrlFrame'] = [];

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

        var formValid = true;
        var data = this.getFormData();    

        // Validate fields
        if(data.acrlFrame.length == 0) {
            formValid = false;
            this.utils.sendMessage("Please select an ACRL framework option");
        }

        if(formValid) {
            this.utils.doAjax('class/add', 'post', data, null).then(responseObject => {
                if(responseObject.status == "ok") {
                    this.utils.sendMessage("Course added.");
                    setTimeout(function() {
                        location.reload(false);
                    }, 3000);
                }
                else {
                    this.utils.sendMessage("Error adding course, please contact Systems support.");
                    console.log("Error: " + responseObject.message);
                }
            });
        }
    }
}
 
