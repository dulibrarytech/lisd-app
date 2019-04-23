import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from 'utils/SystemUtils.js';
import {Configuration} from 'config/configuration';
import {Router} from 'aurelia-router';
import $ from 'jquery'; // for datepicker

export class EntryForm {

    constructor(systemUtils, configuration, router) {
        this.utils = systemUtils;
        this.config = configuration;
        this.router = router;

        this.librarianCount = 1;
        this.selectedLibrarians = [];
        this.selectedLibrarianIDs = [];
        this.activeLibrarian = "";
        this.locationCount = 1;
        this.selectedLocations = [];
        this.departmentCount = 1;
        this.selectedDepartments = [];
        this.selectedClassType = "Undergraduate";
        this.selectedAcrlFrames = [];

        this.librarianList = [];
        this.locationList = [];
        this.departmentList = [];

        this.className = "";
        this.courseNumber = "";
        this.classDate = "";
        this.instructorFName = "";
        this.instructorLName = "";

        this.librarianPlaceholder = "Select a Librarian:";
        this.locationPlaceholder = "Select a Location:";
        this.departmentPlaceholder = "Select a Department:";

        this.quarters = ['Fall', 'Winter', 'Spring', 'Summer'];
        this.classTypes = ['Undergraduate', 'Graduate', 'Graduate-Undergraduate', 'Workshop', 'Orientation'];

        this.acrlFrames = [

            'Authority Is Constructed and Contextual',
            'Information Creation as a Process',
            'Information Has Value',
            'Research as Inquiry',
            'Scholarship as Conversation',
            'Searching as Strategic Exploration',
            'None'
        ];

        this.activeSession = false;
        this.activeClassID = 0;
        if(this.config.session.data) {
            this.activeSession = true;
            this.username = this.config.session.data.fname + " " + this.config.session.data.lname;
        }

        this.courseAdd = true;

        // this.loadDropdownData();
    }

    attached() {
        if(this.config.session.data && this.config.session.data.librarianID !== "") {
            this.activeLibrarian = this.config.session.data.librarianID;

            if(this.courseAdd == true) {
                this.selectedLibrarians = [this.activeLibrarian];
                this.selectOption('librarian');
            }
        }

        if(this.config.session.token == null) {
            document.getElementById('menulink-104').style.display = "none";
        }

        // Check selected acrl frameworks in list
        var options = document.getElementsByClassName("acrl-option");
        for(var i = 0; i < options.length; i++) {   // Get the checkbox list elements

            // Iterate the selected frameworks.  Check the corresponding list checkbox for each selected framework
            for(var j=0; j < this.selectedAcrlFrames.length; j++) {
                if(this.selectedAcrlFrames[j] == this.acrlFrames[i]) {
                    options[i].checked = true;
                }
            }
        }

        // For class data update, initially show the option to add another value in librarian and property dropdowns
        if(!this.courseAdd) {
            document.getElementById("librarian-add").style.visibility = "visible";
            document.getElementById("location-add").style.visibility = "visible";
            document.getElementById("department-add").style.visibility = "visible";
        }
    }

    activate(data) {
       // Class data coming in for edit: store in local fields to populate form
       if(typeof data.className != 'undefined') {
            this.activeSession = false;
            this.courseAdd = false;
            this.activeClassID = data.id;
            this.className = data.className;
            this.classDate = data.classDate.substring(0,10);
            this.courseNumber = data.courseNumber;
            this.instructorFName = data.instructorFName.trim();
            this.instructorLName = data.instructorLName.trim();
            this.numUndergraduates = data.numUndergraduates;
            this.numGraduates = data.numGraduates;
            this.numFacultyStaff = data.numFacultyStaff;
            this.numOther = data.numOther;
            this.selectedClassType = data.selectedClassType;
            this.selectedAcrlFrames = data.selectedAcrlFrames;

            this.librarianCount = data.librarianCount;
            this.locationCount = data.locationCount;
            this.departmentCount = data.departmentCount;


            // From librarian List, convert the IDs in the selLibs array to the librarian names
            // (Get name if ID found)

            this.selectedLibrarians = [];
            for(var index in data.selectedLibrarians) {
                this.selectedLibrarians[index] = data.selectedLibrarians[index];
            }
            //this.selectedLibrarians = data.selectedLibrarians;
            this.selectedLocations = [];
            for(var index in data.selectedLocations) {
                this.selectedLocations[index] = data.selectedLocations[index];
            }
            //this.selectedLocations = data.selectedLocations;
            this.selectedDepartments = [];
            for(var index in data.selectedDepartments) {
                this.selectedDepartments[index] = data.selectedDepartments[index];
            }
            //this.selectedDepartments = data.selectedDepartments;
               

            // Set the quarter select dropdown text
            switch(parseInt(data.quarterSelect)) {
                case 1:
                    this.quarterSelect = "Fall";
                    break;
                case 2:
                    this.quarterSelect = "Winter";
                    break;
                case 3:
                    this.quarterSelect = "Spring";
                    break;
                case 4:
                    this.quarterSelect = "Summer";
                    break;
                default:
                    this.quarterSelect = "Fall";
                    break;
            }
        }
        this.loadDropdownData();
    }

    resetForm() {

        this.className = "";
        this.classDate = "";
        this.quarterSelect = "Fall";
        this.courseNumber = "";
        this.instructorFName = "";
        this.instructorLName = "";
        this.numUndergraduates = "";
        this.numGraduates = "";
        this.numFacultyStaff = "";
        this.numOther = "";
        this.selectedClassType = "Undergraduate";
        this.selectedAcrlFrames = [];

        this.librarianCount = 1;
        this.locationCount = 1;
        this.departmentCount = 1;

        //this.selectedLibrarians = [];
        if(this.activeLibrarian && this.activeLibrarian != "") {
            this.selectedLibrarians = [this.activeLibrarian];
        }
        else {
            this.selectedLibrarians = [];
        }
        this.selectedLocations = [];
        this.selectedDepartments = [];

        this.commentText = "";
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

    // Return an object of all form data
    getFormData() {

        var formData = {};

        // Form text fields
        formData['classDate'] =         this.classDate;

        if(this.quarterSelect == "Fall") {formData['quarter'] = "1";}
        else if(this.quarterSelect == "Winter") {formData['quarter'] = "2";}
        else if(this.quarterSelect == "Spring") {formData['quarter'] = "3";}
        else if(this.quarterSelect == "Summer") {formData['quarter'] = "4";}

        var instructorName = "";
        if(this.instructorFName != "" && this.instructorLName != "") {
            instructorName = this.instructorFName.trim() + " " + this.instructorLName.trim();
        }

        formData['className'] =         this.className;
        formData['courseNumber'] =      this.courseNumber;
        formData['instructorName'] =    instructorName;
        formData['graduates'] =         this.numGraduates || 0;
        formData['undergraduates'] =    this.numUndergraduates || 0;
        formData['facultyStaff'] =      this.numFacultyStaff || 0;
        formData['other'] =             this.numOther || 0;

        // Get dropdown select data.  Use default value if placeholder is selected
        formData['librarian'] =     this.selectedLibrarians[0] == this.librarianPlaceholder ? ["None"] : this.selectedLibrarians;
        formData['location'] =      this.selectedLocations[0] == this.locationPlaceholder ? ["None"] : this.selectedLocations;
        formData['department'] =    this.selectedDepartments[0] == this.departmentPlaceholder ? ["None"] : this.selectedDepartments;

        // Get checkbox group data
        formData['classType'] = [this.selectedClassType];
        formData['acrlFrame'] = this.selectedAcrlFrames;

        formData['commentText'] = this.commentText;
        
        return formData;
    }

    selectOption(section) {
        // Only allow one department selection
        if(section != "department") {
            document.getElementById(section + "-add").style.visibility = "visible"; 
        }
    }

    validateForm(formData) {
        var formValid = true;

        // Validate fields
        if(formData.classDate == "") {
            formValid = false;
            this.utils.sendMessage("Please enter a class date");
        }

        else if(formData.className == "") {
            formValid = false;
            this.utils.sendMessage("Please enter a class name");
        }

        else if(formData.courseNumber == "") {
            formValid = false;
            this.utils.sendMessage("Please enter a course number");
        }

        else if(formData.instructorName == "") {
            formValid = false;
            this.utils.sendMessage("Please enter an instructor name");
        }

        else if(formData.acrlFrame.length == 0) {
            formValid = false;
            this.utils.sendMessage("Please select an ACRL framework option");
        }

        return formValid;
    }

    submit() {

        var formValid = true;
        var data = this.getFormData();  
        var submitData = {
            classID: 0,
            data: data
        };

        if(this.validateForm(data)) {
            
            // Set url and method for new class or edit class
            var url, method, msg;
            if(this.courseAdd) {
                url =  "class/add";
                method = "post";
                msg = "Course added.";
            }
            else {
                url = "class/update";
                method = "put";
                msg = "Course updated.";
                submitData.classID = this.activeClassID;

                // Remove comments from the form data - do not update comments here, it will delete them all
                delete data.comments;
            }

            this.utils.doAjax(url, method, submitData, null).then(responseObject => {
                if(responseObject.status == "ok") {
                    this.utils.sendMessage(msg);
                    if(this.courseAdd) {
                        this.resetForm();
                    }
                }
                else {
                    this.utils.sendMessage("Error adding course, please contact Systems support.");
                    console.log("Error: " + responseObject.message);
                }
            });
        }
    }
}
 
EntryForm.inject = [SystemUtils, Configuration, Router];