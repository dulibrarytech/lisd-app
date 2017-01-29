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
    selectedLibrarians = [];

    selectedSearchTimeframe = [];
    searchTimeframe = ["Academic year", "Fiscal year", "Quarter"];

    selectedSearchType = [];
    searchType = ["All Statistics", "Librarian Statistics", 'Class Data'];

    selectedStatisticsFor = "Class";
    statisticsFor = ["Class", "Student"];

    selectedListResultsBy = "Year";
    listResultsBy = ["Year", "Month", "Quarter"];

    selectedDisplayStatistics = ["Department"];
    displayStatistics = ["Department", "Location", "Type"];

    constructor(systemUtils) {

        this.utils = systemUtils;

        var dropdownData = this.getDropdownData();
        this.librarianList = dropdownData.librarians;
    }

    // Retrieves the current list from the server and populates all select dropdowns
    getDropdownData() {

        var data = {};

        // Select elements
        data["librarians"] = [];

        // Ajax
        this.utils.doAjax('get/data/search/selectValues', 'get', null, function(responseObject) {

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
}