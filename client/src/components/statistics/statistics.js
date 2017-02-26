import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from '../../utils/SystemUtils.js';
import $ from 'jquery'; // for datepicker

@inject(SystemUtils)
export class Statistics {

	ajax;
	utils;

	librarianList = [];
	librarianCount = 1;
    selectedLibrarian = "";

    fromYear;
    toYear;
    fromYears = [];
    toYears = [];

    selectedSearchTimeframe = "Fiscal";
    searchTimeframe = ["Fiscal", "Academic", "Quarter"];

    selectedSearchType = "All Statistics";
    searchType = ["All Statistics", "Librarian Statistics", 'Class Data'];

    selectedStatisticsType = "Class";
    statisticsType = ["Class", "Student"];

    selectedListResultsBy = "Year";
    listResultsBy = ["Year", "Month", "Quarter"];

    selectedDisplayStatistics = "All";
    displayStatistics = ["All", "Department", "Location", "Type", "ACRL Framework"];

    selectedQuarter = "Fall";
    quarters = ["Fall", "Winter", "Spring", "Summer"];

    constructor(systemUtils) {

        this.utils = systemUtils;

        var dropdownData = this.getDropdownData();
        this.librarianList = dropdownData.librarians;
        console.log(this.librarianList);

        // Set for and to year arrays
        //for(var i = 1990; i<)
    }

    attached() {
        document.getElementById('result-options').style.display = "none";
        document.getElementById('new-search').style.display = "none";
        document.getElementById('librarian-select').style.display = "none";
        document.getElementById('year-quarter-select').style.display = "none";
    }

    renderTable(data) {
        console.log("Rendering..." + typeof data);

        var resultObj = data.data;
         console.log(resultObj.year);

        // If a string is passed in, render as a message.  If an object is passed in, attempt to render its data
        if(typeof data == null) { 
            document.getElementById("results-table").innerHTML = "<span id='view-message'>" + data.message + "</span>"; 
        }
        else if(typeof data == "object") { 
            // Show search options, hide the search form
            document.getElementById('result-options').style.display = "block";
            document.getElementById('statistics-search').style.display = "none";
            document.getElementById('new-search').style.display = "block";
            document.getElementById('search-options').style.display = "none";

            var dataTable = '<table id="data-table">';







            dataTable =+ '</table>'



            document.getElementById("results-table").innerHTML = JSON.stringify(resultObj); 
        }
    }

    onChangeQuarterTimePeriod() {
        if(this.selectedSearchTimeframe == "Quarter") {
            document.getElementById('year-quarter-select').style.display = "block";
            document.getElementById('year-date-select').style.display = "none";
        }
        else {
            document.getElementById('year-quarter-select').style.display = "none";
            document.getElementById('year-date-select').style.display = "block";
        }
    }

    onChangeSearchType() {
        console.log("Change search type");
        if(this.selectedSearchType == "Librarian Statistics" || this.selectedSearchType == "Class Data") {
            document.getElementById('librarian-select').style.display = "block";
        }
        else {
            this.selectedLibrarian = "";
            document.getElementById('librarian-select').style.display = "none";
        }
    }

    // Search Options (only available after results are rendered)
    onChangeStatisticsType() {
        console.log("Change stats for");
        this.submitForms();
    }

    onChangeListResultsBy() {
        console.log("Change list by");
        // set visibility of year table
        // set visibility of month table
        // set visibility of quarter table
    }

    onChangeDisplayStatistics() {
        console.log("Change display");
        this.submitForms();
    }

    newSearch() {
        // DEV - TEMP TODO create function to reset form resetForm()
        location.reload(false);
    }

    // Retrieves the current list from the server and populates all select dropdowns
    getDropdownData() {

        var data = {};

        // Select elements
        data["librarians"] = [];
        data["locations"] = [];
        data["departments"] = [];

        // Ajax
        this.utils.doAjax('get/data/entry/selectValues', 'get', null, function(responseObject) {

            // Populate the select boxes with the name and database id of each item
            var currentData = {};
            for(var key in responseObject) {
                if(key == 'librarian') {
                    currentData = responseObject[key];
                    for(var dataItem in currentData) {
                        data["librarians"].push({
                            name: currentData[dataItem],
                            id: dataItem
                        });
                    }
                }
                else if(key == 'location') {
                    currentData = responseObject[key];
                    for(var dataItem in currentData) {
                        data["locations"].push({
                            name: currentData[dataItem],
                            id: dataItem
                        });
                    }
                }
                else if(key == 'department') {
                    currentData = responseObject[key];
                    for(var dataItem in currentData) {
                        data["departments"].push({
                            name: currentData[dataItem],
                            id: dataItem
                        });
                    }
                }
            }
        });

        return data;
    };

    getFormData() {
        var formData = {};

        //formData['searchType'] = this.selectedSearchType;

        formData['statsType'] = this.selectedStatisticsType;
        formData['statsBy'] = this.selectedListResultsBy;
        formData['statsDisplay'] = this.selectedDisplayStatistics;
        formData['searchTimeframe'] = this.selectedSearchTimeframe;

        if(this.selectedSearchTimeframe == "Quarter") {
            formData['fromYear'] = this.fromYear;
            formData['toYear'] = "";
            formData['quarter'] = this.selectedQuarter;
        }
        else {
            formData['fromYear'] = this.fromYear;
            formData['toYear'] = this.toYear;
            formData['quarter'] = "";
        }

        if(this.selectedSearchType == "Librarian Statistics" || this.selectedSearchType == "Class Data") {
            formData['librarian'] = this.selectedLibrarian;
        }
        else {
            formData['librarian'] = "";
        } 

        return formData;
    }; 

    submitForms() {

        var data = this.getFormData();

        console.log(data);


        if(this.selectedSearchType == "Class Data") {
            // class route
            this.utils.doAjax('get/data/search/class', 'get', data, this.renderTable);
        }
        else if(this.selectedSearchType == "All Statistics" || this.selectedSearchType == "Librarian Statistics") {
            // all statistics route
            // Ajax
            this.utils.doAjax('get/data/search/allStatistics', 'get', data, this.renderTable);
        }
        else {
            console.log("Search type error");
        }
    };
}