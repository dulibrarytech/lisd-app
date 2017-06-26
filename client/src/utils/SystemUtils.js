'use strict'

import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Configuration} from '../../../config/configuration';
//let httpClient = new HttpClient();



@inject(HttpClient, Configuration)
export class SystemUtils {

	http;
	spinner;

	constructor(httpClient, config) {

		this.http = httpClient;
    	this.config = config;

		if(typeof httpClient != 'undefined') {
			var token = config.session.token;
			httpClient.configure(config => {
	            config
	                .withBaseUrl(this.config.baseUrl)
	                .withDefaults({
	                    headers: {
	                        'Accept': 'application/json',
	                        'x-id-header': 'lisd-client',
	                        'x-access-token': null
	                    }
	                });
	        });
		}

        // Config spinner
        var opts = {
			  
			  zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '350px' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'relative' // Element positioning
			}
		this.spinner = new Spinner(opts);
	}

	doAjax(url, method, data, callback) {

        var options = {
        	method: method
        }

        if(method == 'post' && data != null) {
        	options['body'] = json(data);
        }
        else if(method == 'get' && data != null) {
        	var qString = "?";
	        for(var field in data) {
	            qString += field + "=" + data[field] + "&";
	        }
	        url += qString.slice(0, -1);
        }

        // Add headers
        this.http.defaults.headers['x-access-token'] = this.config.session.token;

        // Start spinner
        var target = document.getElementById('content');
        this.startSpinner();
        target.appendChild(this.spinner.el);

        // Run the request
        return this.http.fetch(url, options).then(response => response.json())
        .then(response => {
        	this.stopSpinner();
        	return response;
        });
	}

	startSpinner() {
		this.spinner.spin();
	}

	stopSpinner() {
		this.spinner.stop();
	}

	sendMessage(message) {
		document.getElementById('message').innerHTML = message;
		setTimeout(function() { 
			document.getElementById('message').innerHTML = "";
		}, 4500);
	}

	logout() {
        this.config.session.data = {};
        this.config.session.token = "";
        //this.router.reload();
        document.location.reload()
    }
}



