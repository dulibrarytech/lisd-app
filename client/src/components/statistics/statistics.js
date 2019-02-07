import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from '../../utils/SystemUtils.js';
import {ChartUtils} from '../../utils/ChartUtils.js';
import {MonthStringValueConverter} from '../../utils/MonthStringValueConverter.js';
import {QuarterStringValueConverter} from '../../utils/QuarterStringValueConverter.js';
import {Configuration} from '../../../config/configuration';

import $ from 'jquery'; // for datepicker

export class Statistics {

    constructor(systemUtils, chartUtils, monthConverter, quarterConverter, configuration) {

        this.config = configuration;

        // Get the utils functions
        this.utils = systemUtils;
        this.chartUtils = chartUtils;
        this.monthStringValueConverter = monthConverter;
        this.quarterStringValueConverter = quarterConverter;

        this.librarianList = [];
        this.librarianCount = 1;
        this.selectedLibrarian = "";
        this.librarianName = "";
        this.classCountLabel = "";

        // TODO Add to configuration class
        this.selectedSearchTimeframe = "Fiscal";
        this.searchTimeframe = ["Fiscal", "Academic", "Quarter"];
        this.selectedSearchType = "All Statistics";
        this.searchType = ["All Statistics", "Librarian Statistics", 'Class Data', 'Class Data By Librarian'];
        this.selectedStatisticsType = "Class";
        this.statisticsType = ["Class", "Student"];
        this.selectedListResultsBy = "Month";
        this.listResultsBy = ["Month", "Quarter", "Total"];
        this.selectedDisplayStatistics = "All";
        this.displayStatistics = ["All", "Department", "Location", "Type", "ACRL Framework"];
        this.selectedQuarter = "Fall";
        this.quarters = ["Fall", "Winter", "Spring", "Summer"];
        this.displayFormat = this.config.defaultStatisticsFormat;
        this.displayFormats = ["Table", "Chart"];
        this.studentTypes = ["Undergraduate", "Graduate", "Faculty", "Other"];

        this.resultData = [];
        this.activeClass = {};   // Data for class entry (edit) form
        this.subsortValues = [];

        this.comment = {};

        // Get the librarians from the database, populate the librarian select box
        var dropdownData = this.getDropdownData();
        this.librarianList = dropdownData.librarians;

        // Get the year select lists
        this.fromYears = [];
        this.toYears = [];
        this.fromYears = this.getYearList(1990);
        this.toYears = this.getYearList(1990);

        this.activeSession = false;
        this.activeLibrarian = "";
        this.classEditFormVisible = false;

        // Set session data if a session is present
        if(this.config.session.data) {
            this.activeSession = true;
            this.username = this.config.session.data.fname + " " + this.config.session.data.lname;

            // Set active librarian
            if(this.config.session.data.librarianID !== "") {
                this.activeLibrarian = this.config.session.data.librarianID || "";
                this.selectedLibrarian = [this.activeLibrarian];
                this.selectedSearchType = "Librarian Statistics";
            }            
        }

        // Class data
        this.activeClassID = 0;

        // Interface with entryForm class form
        this.activeClass = {
            id: 0,
            className: "",
            classDate: null,
            quarterSelect: "",
            courseNumber: "",
            instructorFName: "",
            instructorLName: "",
            numUndergraduates: 0,
            numGraduates: 0,
            numFacultyStaff: 0,
            numOther: 0,
            selectedLibrarians: [],
            selectedDepartments: [],
            selectedLocations: [],
            selectedClassType: "",
            selectedAcrlFrames: [],
            librarianCount: 1,
            locationCount: 1,
            departmentCount: 1
        }
    }

    attached() {
        this.resetForm();
        //this.f(false);
        this.hideClassComments();
        //this.hideClassEditForm();
        this.showClassEditForm(false);
    }

    isAdmin() {
        return (this.config.session.data && this.config.session.data.role === 1);
    }

    resetActiveClass() {

        this.activeClass = {
            id: 0,
            className: "",
            classDate: null,
            quarterSelect: "",
            courseNumber: "",
            instructorFName: "",
            instructorLName: "",
            numUndergraduates: 0,
            numGraduates: 0,
            numFacultyStaff: 0,
            numOther: 0,
            selectedLibrarians: [],
            selectedDepartments: [],
            selectedLocations: [],
            selectedClassType: "",
            selectedAcrlFrames: [],
            librarianCount: 1,
            locationCount: 1,
            departmentCount: 1
        }
    }

    resetForm() {
 
        // Reset results display
        this.displayResults = false;
        this.displayYear = false;
        this.displayMonth = true;
        this.displayQuarter = false;
        this.showClassComments = false;
        this.classComments = [];

        // Reset search form
        this.selectedStatisticsType = "Class";
        this.selectedListResultsBy = "Month";
        this.selectedDisplayStatistics = "All";
        this.displayFormat = this.config.defaultStatisticsFormat;

        // Reset element visibility
        document.getElementById('result-options').style.display = "none";
        document.getElementById('post-search-options').style.display = "none";
        document.getElementById('librarian-select').style.display = "none";
        document.getElementById('statistics-search').style.display = "block";
        document.getElementById('search-options').style.display = "block";
        document.getElementById('disp-select').style.visibility = "visible";

        if(this.selectedSearchTimeframe != "Quarter") {
            document.getElementById('year-quarter-select').style.display = "none";
        }

        // Default year settings:
        // Set the fromYear to the previous year, set the toYear to current year
        this.fromYear = this.fromYears[(this.fromYears.length-2)];     
        var from = parseInt(this.fromYear) + 1;
        this.toYears = this.getYearList(from);     
        document.getElementById("toYearSelect").visibility = 'hidden';

        // Search results current table/chart.  No table/chart shown by default
        document.getElementById('chart-section').style.display = "none";

        // Do not show admin link if there is no session
        if(this.config.session.token == null) {
            document.getElementById('menulink-104').style.display = "none";
        }

        // Currently selected search type will remain selected on new search.  Display librarian select if search type uses it
        if(this.selectedSearchType == "Librarian Statistics" || this.selectedSearchType == "Class Data By Librarian") {
            document.getElementById('librarian-select').style.display = "block";
        }

        if(this.config.session.data && this.config.session.data.librarianID != "") {
            document.getElementById('librarian-select').style.display = "block";
        }

        this.resultData = [];
        this.subsortValues = [];
        this.selectedSubsortValue = "";
        // this.currentTable = "";
        // this.currentChart = "";
    }

    renderStatisticsTables(data) {

        // Enable the table display
        this.displayResults = true;

        // If a string is passed in, render as a message.  If an object is passed in, attempt to render its data
        if(typeof data == null) { 
            
            document.getElementById("results-table").innerHTML = "<span id='view-message'>" + data.message + "</span>"; 
        }
        else if(typeof data == "object") { 

            // Select display table based on search params
            if(this.selectedStatisticsType == "Class") {

                if(this.selectedDisplayStatistics == "All") {
                    this.currentTable = "class-single-table";
                    //this.currentTable = "class-single-chart";                         // DEV uncomment above
                }
                else {
                    this.currentTable = "class-subsort-table";
                }
            }
            else if(this.selectedStatisticsType == "Student") {

                if(this.selectedDisplayStatistics == "All") {
                    this.currentTable = "student-single-table";
                }
                else {
                    this.currentTable = "student-subsort-table";
                }
            }

            // Update table visibility for 'results by' setting
            this.onChangeListResultsBy(); 
        }
    }

    renderStatisticsCharts() {

        //this.currentTable = "class-single-chart";   
        document.getElementById('chart-section').style.display = "block";                                                        // DEV 

        // If a string is passed in, render as a message.  If an object is passed in, attempt to render its data
        if(typeof this.resultData == null) { 
            document.getElementById("results-chart").innerHTML = "<span id='view-message'>" + this.resultData.message + "</span>"; 
        }
        else if(typeof this.resultData == "object") {

            // Hide the tables if visible
            this.displayResults = false;

            // Get chart configuration based on search settings
            var config = {};
            var labels = [], data = [];
            var months, quarters;

            // Reset canvas 
            this.resetCanvasElement();

            // Single sorting chart
            if(this.selectedDisplayStatistics == "All") {

                // Class statistics
                if(this.selectedStatisticsType == "Class") {

                    if(this.displayYear) {  // Year = total for time period (Totals)

                        // Show the total number of classes
                        labels = ['Total Classes'];
                        data = [this.resultData.yearTotals];
                    }
                    else if(this.displayMonth) {

                        // Add month labels for columns
                        for(var index in this.resultData.month) {
                            labels.push( this.monthStringValueConverter.toView( this.resultData.month[index] ).substring(0,3) );
                        }

                        // Add column data
                        for(var index in this.resultData.month) {
                            for(var key in this.resultData.month[index]) {
                                data.push(this.resultData.month[index][key]);
                            }
                        }
                    }
                    else if(this.displayQuarter) {

                        // Add quarter labels for columns
                        for(var index in this.resultData.quarter) {
                            labels.push(this.quarterStringValueConverter.toView(this.resultData.quarter[index]));
                        }

                        // Add column data
                        for(var index in this.resultData.quarter) {
                            for(var key in this.resultData.quarter[index]) {
                                data.push(this.resultData.quarter[index][key]);
                            }
                        }
                    }

                    this.chartUtils.renderClassSingleChart(labels, data);
                }

                // Student statistics
                else if(this.selectedStatisticsType == "Student") {

                    var tempData = [];
                    data = [];

                    // Get label array, data array
                    if(this.displayYear) {  // Year = total for time period (Totals)

                        // Show the total number of classes
                        labels = ['Total Students'];
                        for(var index in this.resultData.year) {
                            tempData.push(this.resultData.year[index]);
                        }
                        data.push(tempData);
                    }
                    else if(this.displayMonth) {

                        //Add month labels for columns
                        for(var index in this.resultData.month) {
                            labels.push( this.monthStringValueConverter.toView( this.resultData.month[index] ).substring(0,3) );
                        }

                        // // Add column data
                        for(var index of this.resultData.month) {
                            for(var subindex in index) {
                                tempData = [];
                                for(var val in index[subindex]) {
                                    tempData.push(index[subindex][val]);
                                }
                            }
                            data.push(tempData);
                        }

                        //data.push(tempData);
                    }
                    else if(this.displayQuarter) {

                        // Add quarter labels for columns
                        for(var index in this.resultData.quarter) {
                            labels.push(this.quarterStringValueConverter.toView(this.resultData.quarter[index]));
                        }

                        // // Add column data
                        for(var index of this.resultData.quarter) {
                            for(var subindex in index) {
                                tempData = [];
                                for(var val in index[subindex]) {
                                    tempData.push(index[subindex][val]);
                                }
                            }
                            data.push(tempData);
                        }
                    }
                    
                    this.chartUtils.renderStudentSingleChart(labels, data);
                }
            }

            // Subsorting chart
            else {

                if(this.selectedStatisticsType == "Class") {

                    // Get label array, data array
                    if(this.displayYear) {
                        labels = [this.selectedSubsortValue];
                        data = [this.resultData.year[this.selectedSubsortValue]];
                    }
                    else if(this.displayMonth) {

                        // Add month labels for columns
                        for(var index in this.resultData.month) {
                            labels.push( this.monthStringValueConverter.toView( this.resultData.month[index] ).substring(0,3) );
                        }

                        // Add column data
                        for(var index in this.resultData.month) {
                            for(var key in this.resultData.month[index]) {
                                if(typeof this.resultData.month[index][key][this.selectedSubsortValue] != 'undefined') {
                                    data.push(this.resultData.month[index][key][this.selectedSubsortValue]);
                                }
                                else {
                                    data.push(0);
                                }
                            }
                        }
                    }
                    else if(this.displayQuarter) {

                        // Add quarter labels for columns
                        for(var index in this.resultData.quarter) {
                            labels.push(this.quarterStringValueConverter.toView(this.resultData.quarter[index]));
                        }

                        // Add column data
                        for(var index in this.resultData.quarter) {
                            for(var key in this.resultData.quarter[index]) {
                                if(typeof this.resultData.quarter[index][key][this.selectedSubsortValue] != 'undefined') {
                                    data.push(this.resultData.quarter[index][key][this.selectedSubsortValue]);
                                }
                                else {
                                    data.push(0);
                                }
                            }
                        }
                    }

                    this.chartUtils.renderClassSingleChart(labels, data);
                }
                else if(this.selectedStatisticsType == "Student") {

                    var tempData = [];
                    data = [];

                    // Get label array, data array
                    if(this.displayYear) {  // Year = total for time period (Totals)

                        // Show the total number of classes
                        labels = ['Total Students'];
                        for(var index in this.resultData.year[this.selectedSubsortValue]) {
                            tempData.push(this.resultData.year[this.selectedSubsortValue][index]);
                        }
                        data.push(tempData);
                    }
                    else if(this.displayMonth) {

                         //Add month labels for columns
                        for(var index in this.resultData.month) {
                            labels.push( this.monthStringValueConverter.toView( this.resultData.month[index] ).substring(0,3) );
                        }

                        // // Add column data
                        for(var index of this.resultData.month) {
                            tempData = [];
                            for(var subindex in index) {

                                if(typeof index[subindex][this.selectedSubsortValue] == 'undefined') {
                                    for(var i in this.studentTypes) {
                                        tempData.push(0);
                                    }
                                }

                                for(var key in index[subindex][this.selectedSubsortValue]) {
                                    if(typeof index[subindex][this.selectedSubsortValue][key] != 'undefined') {
                                        tempData.push(index[subindex][this.selectedSubsortValue][key]);
                                    }
                                }
                            }
                            data.push(tempData);
                        }
                    }
                    else if(this.displayQuarter) {

                         //Add month labels for columns
                        for(var index in this.resultData.quarter) {
                            labels.push( this.quarterStringValueConverter.toView( this.resultData.quarter[index] ) );
                        }

                        // // Add column data
                        for(var index of this.resultData.quarter) {
                            tempData = [];
                            for(var subindex in index) {

                                if(typeof index[subindex][this.selectedSubsortValue] == 'undefined') {
                                    for(var i in this.studentTypes) {
                                        tempData.push(0);
                                    }
                                }

                                for(var key in index[subindex][this.selectedSubsortValue]) {
                                    if(typeof index[subindex][this.selectedSubsortValue][key] != 'undefined') {
                                        tempData.push(index[subindex][this.selectedSubsortValue][key]);
                                    }
                                }
                            }
                            data.push(tempData);
                        }
                    }

                    this.chartUtils.renderStudentSingleChart(labels, data);
                }
            }
        }
    }

    renderClassDataTable(data) {

        // If a string is passed in, render as a message.  If an object is passed in, attempt to render its data
        if(typeof data == null) { 
            
            document.getElementById("results-table").innerHTML = "<span id='view-message'>" + data.message + "</span>"; 
        }
        else if(typeof data == "object") { 

            // this.displayFormat = "Chart";
            // this.onChangeDisplayFormat();
            document.getElementById('chart-section').style.display = "none"; 
            document.getElementById('results-section').style.display = "block"; 

            // Show search options, hide the search form
            document.getElementById('result-options').style.display = "block";
            document.getElementById('statistics-search').style.display = "none";
            document.getElementById('new-search').style.display = "inline-block";
            document.getElementById('search-options').style.display = "none";
            document.getElementById('result-options').style.display = "none";

            this.currentTable = "class-data";
            this.classCountLabel = (data.length > 1 || data.length == 0) ? "Classes" : "Class";

            // Enable the table display
            this.displayResults = true;

            // Update table visibility for 'results by' setting
            this.onChangeListResultsBy(); 
        }
    }

    sortResultMonthsByTimePeriod(resultData) {
         // Reorder months in order of current year timeframe
        var monthsArr = [];
        var tempObj = {};
        if(this.selectedSearchTimeframe == "Fiscal") {
            for(var key in resultData.month) {
                if(parseInt(key) >= 7) {
                    tempObj = {}
                    tempObj[key] = resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
            for(var key in resultData.month) {
                if(parseInt(key) < 7) {
                    tempObj = {}
                    tempObj[key] = resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
        }
        else if(this.selectedSearchTimeframe == "Academic") {
            for(var key in resultData.month) {
                if(parseInt(key) >= 9) {
                    tempObj = {}
                    tempObj[key] = resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
            for(var key in resultData.month) {
                if(parseInt(key) < 9) {
                    tempObj = {}
                    tempObj[key] = resultData.month[key];
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

            for(var key in resultData.month) {
                if(parseInt(key) >= fromMonth && parseInt(key) <= toMonth) {
                    tempObj = {}
                    tempObj[key] = resultData.month[key];
                    monthsArr.push(tempObj);
                }
            }
        }
        return monthsArr;
    }

    sortResultQuartersByTimePeriod(data) {
        // Reorder quarters in order of current year timeframe
        var quartersArr = [];
        var tempObj = {};
        if(this.selectedSearchTimeframe == "Fiscal") {
            for(var key in data.quarter) {
                if(parseInt(key) >= 4) {
                    tempObj = {}
                    tempObj[key] = data.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
            for(var key in data.quarter) {
                if(parseInt(key) < 4) {
                    tempObj = {}
                    tempObj[key] = data.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
        }
        // No reordering, just add the objects to the array in default order
        else if(this.selectedSearchTimeframe == "Academic") {
            // for(var key in data.quarter) {
            //     tempObj = {}
            //     tempObj[key] = data.quarter[key];
            //     quartersArr.push(tempObj);
            // }
            for(var key in data.quarter) {
                if(parseInt(key) >= 1) {
                    tempObj = {}
                    tempObj[key] = data.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
            for(var key in data.quarter) {
                if(parseInt(key) < 1) {
                    tempObj = {}
                    tempObj[key] = data.quarter[key];
                    quartersArr.push(tempObj);
                }
            }
        }
        else if(this.selectedSearchTimeframe == "Quarter") {

            switch(this.selectedQuarter) {
                case "Fall":
                    {
                        tempObj = {};
                        tempObj["1"] = data.quarter["1"];
                        quartersArr.push(tempObj);
                    }
                    break;
                case "Winter":
                    {
                        tempObj = {};
                        tempObj["2"] = data.quarter["2"];
                        quartersArr.push(tempObj);
                    }
                    break;
                case "Spring":
                    {
                        tempObj = {};
                        tempObj["3"] = data.quarter["3"];
                        quartersArr.push(tempObj);
                    }
                case "Summer":
                    {
                        tempObj = {};
                        tempObj["4"] = data.quarter["4"];
                        quartersArr.push(tempObj);
                    }
                    break;
                default:
                    break;
            }
        }
        return quartersArr;
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

        // Auto select active librarian in dropdown
        if(this.activeLibrarian != "" && this.selectedSearchType == "Librarian Statistics") {
            this.selectedLibrarian = [this.activeLibrarian];
        }

        // Show librarian select if class data or librarian statistics, hide it if general statistics
        if(this.selectedSearchType == "Librarian Statistics" || this.selectedSearchType == "Class Data By Librarian") {
            document.getElementById('librarian-select').style.display = "block";
        }
        else {
            this.selectedLibrarian = "";
            document.getElementById('librarian-select').style.display = "none";
        }
    }

    onChangeListResultsBy() {

        this.displayYear = this.selectedListResultsBy == "Total" ? true : false;
        this.displayMonth = this.selectedListResultsBy == "Month" ? true : false;
        this.displayQuarter = this.selectedListResultsBy == "Quarter" ? true : false;

        // // Render the charts again
        if(this.displayFormat == "Chart") {
            this.renderStatisticsCharts(this.resultData);
        }
    }

    onChangeDisplayFormat() {

        if(this.displayFormat == "Table") {
            document.getElementById('chart-section').style.display = "none";
            this.submitForms();
            //this.renderStatisticsTables(this.resultData);
        }
        else if(this.displayFormat == "Chart") {
            document.getElementById('chart-section').style.display = "block";
            this.submitForms();
            //this.renderStatisticsCharts(this.resultData);
        }
    }

    onChangeSubsortSelect() {
        this.renderStatisticsCharts(this.resultData);
    }

    newSearch() {
        // DEV - TEMP TODO create function to reset form resetForm()
        //location.reload(false);
        this.resetForm();
        this.showClassEditForm(false);
        this.hideClassComments();
        //this.hideClassEditForm();
    }

    resetCanvasElement() {
        var canvasElt = document.createElement('canvas');
        canvasElt.setAttribute("id", "results-chart");
        canvasElt.setAttribute("class", "results-chart");
        document.getElementById('chart-section').removeChild(document.getElementById('results-chart'));
        document.getElementById('chart-section').appendChild(canvasElt);
    }

    // Populates librarian select dropdown
    getDropdownData() {

        var data = {};

        // Select elements
        data["librarians"] = [];
        this.utils.doAjax('get/data/search/selectValues', 'get', null, null).then(responseObject => {
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
            }
        });

        return data;
    };

    getYearList(startYear) {
        var years = [];
        // Set for and to year arrays
        var data = new Date();
        for(var i = startYear; i <= new Date().getFullYear()+1; i++) {
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

    refreshClassDataTable() {
        // class route
        var data = this.getFormData();
        this.utils.doAjax('get/data/search/class', 'get', data, null).then(data => {

            // Remove the timestamp
            for(var index in data.data) {
               data.data[index].courseInfo.date = data.data[index].courseInfo.date.substring(0,10);
            }
            this.resultData = data.data;

            // Convert librarian id's to name, for display
            for(var course of this.resultData) {
                for(var index in course.associatedLibrarians) {
                    course.associatedLibrarians[index] = this.getLibrarianName(course.associatedLibrarians[index]);
                }
            }
        });
    }

    getLibrarianName(librarianID) {
        var name = "";
        for(var index of this.librarianList) {
            if(index.id == librarianID) {
                name = index.name;
                break;
            }
        }
        return name;
    }

    submitForms() {

        var data = this.getFormData(),
            reqLibrarian = data.librarian;

        //  Test for undefined
        data['token'] = this.config.session.token;

        this.displayResults = false;

        var selIndex = document.getElementById('librarian-select-input').selectedIndex;
        this.librarianName = document.getElementById('librarian-select-input')[selIndex].textContent;

        if(this.selectedSearchType == "Class Data") {

            // class route
            this.utils.doAjax('get/data/search/class', 'get', data, null).then(data => {

                // Class edit button visibility logic: Show if admin logged in, or if active librarian == librarian specified in class data search
                this.showClassEditButton = (reqLibrarian == this.activeLibrarian || this.isAdmin()) ? true : false;

                // Remove the timestamp
                for(var index in data.data) {
                   data.data[index].courseInfo.date = data.data[index].courseInfo.date.substring(0,10);
                }

                this.resultData = data.data;
                if(this.resultData) {

                    // Convert librarian id's to name, for display
                    for(var course of this.resultData) {
                        for(var index in course.associatedLibrarians) {
                            course.associatedLibrarians[index] = this.getLibrarianName(course.associatedLibrarians[index]);
                        }
                    }

                    // Show search options, hide the search form
                    document.getElementById('result-options').style.display = "block";  
                    document.getElementById('statistics-search').style.display = "none";
                    document.getElementById('post-search-options').style.display = "block";
                    document.getElementById('search-options').style.display = "none";
                    document.getElementById('disp-select').style.visibility = "hidden";

                    // Render the view (no chart option)
                    this.displayFormat = "Table";
                    this.renderClassDataTable(this.resultData);
                }
            });
        }

        else if(this.selectedSearchType == "All Statistics" || this.selectedSearchType == "Librarian Statistics") {

            // all statistics route
            this.utils.doAjax('get/data/search/allStatistics', 'get', data, null).then(data => {

                this.resultData = data.data;
                if(this.resultData) {
                        
                    // Prep the response for the view templates
                    // if(this.selectedStatisticsType == "Class") {
                    //     this.resultData.year['total'] = this.resultData.year.totals;
                    // }
                    delete this.resultData.year.totals;     // Do not display this in the view table
                    this.resultData.month = this.sortResultMonthsByTimePeriod(this.resultData);
                    this.resultData.quarter = this.sortResultQuartersByTimePeriod(this.resultData);

                    // Show search options, hide the search form
                    document.getElementById('result-options').style.display = "block"; 
                    document.getElementById('statistics-search').style.display = "none";
                    document.getElementById('post-search-options').style.display = "block";
                    document.getElementById('search-options').style.display = "none";

                    // Render the view
                    if(this.displayFormat == "Table") {
                        this.renderStatisticsTables(this.resultData);
                    }
                    else if(this.displayFormat == "Chart") {

                        // Populate group select box, if not single sort
                        if(this.selectedDisplayStatistics != "All") {
                            this.subsortValues = []; // Clear past search results
                            for (var key in this.resultData.year) {
                                this.subsortValues.push(key);
                            }
                            this.selectedSubsortValue = this.subsortValues[0];  // Defaults to first in list
                        }

                        this.renderStatisticsCharts(this.resultData);
                    }
                }
            });
        }
        else {
            console.log("Search type error");
        }
    };

    viewClassComments(classID) {

        this.showClassEditForm(false);

        // Store the selected class id
        this.activeClassID = classID;

        // Reset the comment form
        this.comment.name = "";
        this.comment.comment = "";

        // Get all comments for this class
        this.utils.doAjax('class/get/comments', 'get', {classID: classID}, null).then(data => {
            if(data.data.length > 0) {
                this.classComments = data.data;
            }
            else {
                this.classComments = [];
                this.classComments.push({
                    name: "No comments found",
                    text: null
                });
            }
            this.showClassComments = true;
        });
    };

    hideClassComments() {
        this.classComments = [];
        this.showClassComments = false;
        this.activeClassID = 0;
    }

    closeEditForm() {
        this.showClassEditForm(false);
        this.refreshClassDataTable();
    }

    showClassEditForm(show) {
        this.classEditFormVisible = show;
    }

    addComment() {
        this.utils.doAjax('class/add/comment', 'post', {classID: this.activeClassID, comment: this.comment}, null).then(data => {
            if(data.status == "ok") {
                var newComment = {};
                newComment['name'] = this.comment.name;
                newComment['text'] = this.comment.comment;

                // Update the comment list
                this.classComments.push(newComment);

                // Reset the comment form
                this.comment.name = "";
                this.comment.comment = "";
            }
            else {
                console.log(data.message);
            }
        });
    }

    editClassData(classID) {
        // Get all comments for this class
        this.utils.doAjax('class/get', 'get', {classID: classID}, null).then(data => {
            if(data.status == "ok") {

                // Build the data object for the class data form   
                var classData = data.data, count=0;
                this.resetActiveClass();

                this.activeClass.id = classID;
                this.activeClass.className = classData.name;
                this.activeClass.classDate = classData.date;
                this.activeClass.quarterSelect = classData.quarter;
                this.activeClass.courseNumber = classData.number;

                var names = classData.instructor.split(" ");
                this.activeClass.instructorFName = names[0];
                this.activeClass.instructorLName = names[1];

                // Set Librarians
                count=0;
                for(var index of classData.librarians) {
                    count++;
                    this.activeClass.selectedLibrarians.push(index);
                }
                this.activeClass.librarianCount = count;

                // Set departments
                count=0;
                for(var index of classData.departments) {
                    count++;
                    this.activeClass.selectedDepartments.push(index);
                }
                this.activeClass.departmentCount = count;

                // Set locations
                count=0;
                for(var index of classData.locations) {
                    count++;
                    this.activeClass.selectedLocations.push(index);
                }
                this.activeClass.locationCount = count;

                // this.activeClass.locationCount = count;
                this.activeClass.numUndergraduates = classData.undergraduates;
                this.activeClass.numGraduates = classData.graduates;
                this.activeClass.numFacultyStaff = classData.faculty;
                this.activeClass.numOther = classData.other;
                this.activeClass.selectedAcrlFrames = classData.acrlFrameworks;
                this.activeClass.selectedClassType = classData.types[0];
                this.hideClassComments();
                this.showClassEditForm(true);
            }
            else {
                console.log("Error: Could not get class data. ", data.message);
            }
        });
    }

    deleteClassDataConfirm(classID) {

        var deleteBtnID = "delete-class-button-" + classID,
            confirmBtnID = "delete-class-button-confirm-" + classID;

        document.getElementById(deleteBtnID).style.display = "none";
        document.getElementById(confirmBtnID).style.display = "block";

        setTimeout(function() { 
            if(document.getElementById(deleteBtnID)) {
                document.getElementById(deleteBtnID).style.display = "block";
            }
            if(document.getElementById(confirmBtnID)) {
                document.getElementById(confirmBtnID).style.display = "none";
            }
          
        }, 3000);
    }

    deleteClassData(classID) {

        var deleteBtnID = "delete-class-button-" + classID,
            confirmBtnID = "delete-class-button-confirm-" + classID;

        document.getElementById(deleteBtnID).style.display = "block";
        document.getElementById(confirmBtnID).style.display = "none";

        // Get all comments for this class
        this.utils.doAjax('class/delete', 'delete', {classID: classID}, null).then(data => {
            if(data.status == "ok") {
                console.log("Class deleted.");
                this.resetActiveClass();
                this.refreshClassDataTable();
            }
            else {
                console.log("Error: Could not delete class. ", data.message);
            }
        });
    }; 

    exportData() {

        // Get the page label for the file header
        var pdf, content = ""; 
        content += document.getElementById("daterange").textContent;
        content += " ";
        content += document.getElementById("stats-type-label").textContent;

        // Use the daterange and stats type text as filename.  (including spaces)
        var filename = content;

        // Create a new pdf doc, add the current statistics label
        var doc = new jsPDF('p', 'pt');
        doc.text(content, 40, 30);

        // Convert html to pdf
        if(this.displayFormat == "Table") {
            var tableID = "";
            switch(this.selectedListResultsBy) {
                case "Month":
                    tableID = "month-results";
                    break;
                case "Quarter":
                    tableID = "quarter-results";
                    break;
                default:
                    tableID = "year-results";
                    break;
            }

            var tableElts = document.getElementById(tableID).children, table, rows, data;
            var columns = [], rowData = [], tableData = [];
            
            // Handle statistics with a single output table
            if(tableElts.length == 1) {
                table = tableElts[0];
                rows = table.children[0].children;

                for(var i=0; i<rows.length; i++) {
                    data = rows[i].children;

                    for(var j=0; j<data.length; j++) {
                        if(data[j].nodeName.toLowerCase() == "th") {
                            columns.push(data[j].innerHTML);
                        }
                        else if(data[j].nodeName.toLowerCase() == "td") {
                            rowData.push(data[j].innerHTML);
                        }

                        // Kludge - For jspdf autotable, th element count must match td element count.  Some tables do not do this (doh), so add the empty th's here
                        if(columns.length != rowData.length) {
                            for(var l=0; l<rowData.length; l++) {
                                if(typeof columns[l] == 'undefined') {
                                    columns[l] = "";
                                }
                            }
                        }
                    }

                    if(rowData.length > 0) {
                        tableData.push(rowData);
                        rowData = [];
                    }
                }
                
                var options = {
                    margin: {top: 50}, 
                    theme: "grid", 
                    showHeader: "never"
                };
                doc.autoTable(columns, tableData, options);
            }
            
            // Handle statistics with multiple tables (sections) by month or by quarter, etc
            else if(tableElts.length > 1) {
                columns = ["", ""];
                var section = "", tableHeight = 50;
                for(var div of tableElts) {

                    rowData.push([div.children[0].innerHTML]);
                    tableData.push(rowData);
                    rowData = [];

                    table = div.children[1];
                    rows = table.children[0].children;

                    for(var i=0; i<rows.length; i++) {
                        data = rows[i].children;
                        
                        for(var j=0; j<data.length; j++) {
                            if(data[j].nodeName.toLowerCase() == "td") {
                                rowData.push(data[j].innerHTML);
                            }
                        }

                        if(rowData.length > 0) {
                            tableData.push(rowData);
                            rowData = [];
                        }
                    }
                    tableData.push(["", ""]);
                }

                var options = {
                    margin: {top: 50}, 
                    pageBreak: "avoid", 
                    theme: "grid", 
                    showHeader: "never"
                };
                doc.autoTable(columns, tableData, options);
            }
            else {
                // Do not render the table.  Display error message
                console.log("Error building table for file export")
            }
            doc.save(filename);
        }

        else if(this.displayFormat == "Chart") {
            // Create local pdf
            pdf = new jsPDF("p", "mm", "a4");
            pdf.text(content, 10, 15);

            if(document.getElementById("subsort-select")) {
                pdf.text(this.selectedSubsortValue, 10, 25);
                filename += " - " + this.selectedSubsortValue;
            }

            var chart = document.getElementById('results-chart');
            var imgData = chart.toDataURL();
            pdf.setFillColor(256,256,256);
            pdf.addImage(imgData, 'JPEG', 10, 35, 170, 110);
            pdf.save(filename);
        }
    }  
}
Statistics.inject = [SystemUtils, ChartUtils, MonthStringValueConverter, QuarterStringValueConverter, Configuration];