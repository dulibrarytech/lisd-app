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

    fromYear = "";
    toYear = "";
    fromYears = [];
    toYears = [];

    selectedSearchTimeframe = "Fiscal";
    searchTimeframe = ["Fiscal", "Academic", "Quarter"];

    selectedSearchType = "All Statistics";
    searchType = ["All Statistics", "Librarian Statistics", 'Class Data'];

    selectedStatisticsType = "Class";
    statisticsType = ["Class", "Student"];

    selectedListResultsBy = "Total";
    listResultsBy = ["Total", "Month", "Quarter"];

    selectedDisplayStatistics = "All";
    displayStatistics = ["All", "Department", "Location", "Type", "ACRL Framework"];

    selectedQuarter = "Fall";
    quarters = ["Fall", "Winter", "Spring", "Summer"];

    studentTypes = ["Undergraduate", "Graduate", "Faculty", "Other"];

    resultData = [];
    currentTable;
    displayResults;
    displayYear;
    displayMonth;
    displayQuarter;

    constructor(systemUtils) {

        // Get the utils functions
        this.utils = systemUtils;

        // Get the librarians from the database, populate the librarian select box
        var dropdownData = this.getDropdownData();
        this.librarianList = dropdownData.librarians;
        console.log(this.librarianList);

        // Get the year select lists
        this.fromYears = this.getYearList(1990);
        this.toYears = this.getYearList(1990);

        this.displayResults = false;
        this.displayYear = true;
        this.displayMonth = false;
        this.displayQuarter = false;
    }

    attached() {

        console.log("ATT");

        // Element vicibility
        document.getElementById('result-options').style.display = "none";
        document.getElementById('new-search').style.display = "none";
        document.getElementById('librarian-select').style.display = "none";
        document.getElementById('year-quarter-select').style.display = "none";

        // Default year settings:
        // Set the fromYear to the previous year, set the toYear to current year
        this.fromYear = this.fromYears[(this.fromYears.length-2)];     
        var from = parseInt(this.fromYear) + 1;
        this.toYears = this.getYearList(from);     
        document.getElementById("toYearSelect").visibility = 'hidden';

        // Search results current table.  No table shown by default
        this.currentTable = "";
    }

    renderTable(data) {

        console.log("Rendering table....");
        console.log(JSON.stringify(data));
        this.resultData = data;

        // Reorder months in order of current year timeframe
        var monthsArr = [];
        var tempObj = {};
        if(this.selectedSearchTimeframe == "Fiscal") {
            for(var key in this.resultData.month) {
                if(parseInt(key) >= 7) {
                    tempObj = {}
                    tempObj[key] = this.resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
            for(var key in this.resultData.month) {
                if(parseInt(key) < 7) {
                    tempObj = {}
                    tempObj[key] = this.resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
        }
        else if(this.selectedSearchTimeframe == "Academic") {
            for(var key in this.resultData.month) {
                if(parseInt(key) >= 9) {
                    tempObj = {}
                    tempObj[key] = this.resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
            for(var key in this.resultData.month) {
                if(parseInt(key) < 9) {
                    tempObj = {}
                    tempObj[key] = this.resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
        }
        else if(this.selectedSearchTimeframe == "Quarter") {

            var fromMonth, toMonth;
            switch(this.selectedQuarter) {
                case "Fall":
                    {
                        fromMonth = 9;
                        toMonth = 12;
                    }
                    break;
                case "Winter":
                    {
                        fromMonth = 1;
                        toMonth = 4;
                    }
                    break;
                case "Spring":
                    {
                        fromMonth = 3;
                        toMonth = 6;
                    }
                case "Summer":
                    {
                        fromMonth = 6;
                        toMonth = 9;
                    }
                    break;
                default:
                    break;
            }

            for(var key in this.resultData.month) {
                if(parseInt(key) >= fromMonth && parseInt(key) <= toMonth) {
                    tempObj = {}
                    tempObj[key] = this.resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
        }
        this.resultData.month = monthsArr;
        
            console.log("Monthsorted Result data:");
            console.log(JSON.stringify(this.resultData));


        // Reorder quarters in order of current year timeframe
        var quartersArr = [];
        var tempObj = {};
        if(this.selectedSearchTimeframe == "Fiscal") {
            for(var key in this.resultData.quarter) {
                if(parseInt(key) >= 4) {
                    tempObj = {}
                    tempObj[key] = this.resultData.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
            for(var key in this.resultData.quarter) {
                if(parseInt(key) < 4) {
                    tempObj = {}
                    tempObj[key] = this.resultData.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
        }
        // No reordering, just add the objects to the array in default order
        else if(this.selectedSearchTimeframe == "Academic") {
            for(var key in this.resultData.quarter) {
                tempObj = {}
                tempObj[key] = this.resultData.quarter[key];
                quartersArr.push(tempObj);
            }
        }
        else if(this.selectedSearchTimeframe == "Quarter") {

            switch(this.selectedQuarter) {
                case "Fall":
                    {
                        tempObj = {};
                        tempObj["1"] = this.resultData.quarter["1"];
                        quartersArr.push(tempObj);
                    }
                    break;
                case "Winter":
                    {
                        tempObj = {};
                        tempObj["2"] = this.resultData.quarter["2"];
                        quartersArr.push(tempObj);
                    }
                    break;
                case "Spring":
                    {
                        tempObj = {};
                        tempObj["3"] = this.resultData.quarter["3"];
                        quartersArr.push(tempObj);
                    }
                case "Summer":
                    {
                        tempObj = {};
                        tempObj["4"] = this.resultData.quarter["4"];
                        quartersArr.push(tempObj);
                    }
                    break;
                default:
                    break;
            }
        }
        this.resultData.quarter = quartersArr;

            console.log("Quarter sorted Result data:");
            console.log(JSON.stringify(this.resultData));

        if(typeof data == null) { 
            // If a string is passed in, render as a message.  If an object is passed in, attempt to render its data
            document.getElementById("results-table").innerHTML = "<span id='view-message'>" + data.message + "</span>"; 
        }
        else if(typeof data == "object") { 

            // Show search options, hide the search form
            document.getElementById('result-options').style.display = "block";
            document.getElementById('statistics-search').style.display = "none";
            document.getElementById('new-search').style.display = "block";
            document.getElementById('search-options').style.display = "none";

            // Select display table based on search params
            if(this.selectedStatisticsType == "Class") {

                if(this.selectedDisplayStatistics == "All") {
                    this.currentTable = "class-single";
                }
                else {
                    this.currentTable = "class-subsort";
                }
            }
            else if(this.selectedStatisticsType == "Student") {

                if(this.selectedDisplayStatistics == "All") {
                    this.currentTable = "student-single";
                }
                else {
                    this.currentTable = "student-subsort";
                }
            }
            this.displayResults = true;
            this.onChangeListResultsBy();   // Update table visibility for 'results by' setting
        }
    }

    sortResultMonthsByTimePeriod(data) {

    }

    sortResultQuartersByTimePeriod(data) {
        
    }

    onChangeFromYear() {
        var from = parseInt(this.fromYear) + 1;
        this.toYears = this.getYearList(from);
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

        this.displayYear = this.selectedListResultsBy == "Total" ? true : false;
        this.displayMonth = this.selectedListResultsBy == "Month" ? true : false;
        this.displayQuarter = this.selectedListResultsBy == "Quarter" ? true : false;
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
        this.utils.doAjax('get/data/entry/selectValues', 'get', null, null).then(responseObject => {
            this.utils.stopSpinner();
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

    getYearList(startYear) {
        var years = [];
        // Set for and to year arrays
        var data = new Date();
        for(var i = startYear; i <= new Date().getFullYear(); i++) {
            years.push(i);
        }
        return years;
    }

    getFormData() {
        var formData = {};

        //formData['searchType'] = this.selectedSearchType;

        formData['statsType'] = this.selectedStatisticsType;
        formData['statsBy'] = this.selectedListResultsBy;
        formData['statsDisplay'] = this.selectedDisplayStatistics;
        formData['searchTimeframe'] = this.selectedSearchTimeframe;

        if(this.selectedSearchTimeframe == "Quarter") {
            formData['fromYear'] = this.fromYear;
            formData['toYear'] = this.fromYear;
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
        this.displayResults = false;

        if(this.selectedSearchType == "Class Data") {

            // class route
            this.utils.doAjax('get/data/search/class', 'get', data, null).then(data => {
                this.utils.stopSpinner();
                this.renderTable(data.data);
            });
        }
        else if(this.selectedSearchType == "All Statistics" || this.selectedSearchType == "Librarian Statistics") {

            // all statistics route
            this.utils.doAjax('get/data/search/allStatistics', 'get', data, null).then(data => {
                this.utils.stopSpinner();
                this.renderTable(data.data);
            });
        }
        else {
            console.log("Search type error");
        }
    };
}