'use strict'

import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Configuration} from 'config/configuration';
import {Session} from 'libs/session.js';

export class SystemUtils {

	constructor(httpClient, config) {

		this.http = httpClient;	
    	this.config = config;

		if(typeof httpClient != 'undefined') {
			httpClient.configure(config => {
	            config
	                .withBaseUrl(this.config.baseUrl)
					//.withBaseUrl(this.config.baseUrl + this.config.clientPath)
	                .withDefaults({
	                    headers: {
	                        'Accept': 'application/json',
	                        'client-id-header': 'lisd-client',
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

        if(method == 'get' && data != null) {
        	var qString = "?";
	        for(var field in data) {
	            qString += field + "=" + data[field] + "&";
	        }
	        url += qString.slice(0, -1);
        }
        else if(method != 'get') {
        	options['body'] = json(data);
        }

        // Add headers
        this.http.defaults.headers['x-access-token'] = Session.getToken();

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

	fetchDatastream(url, data) {
		var qString = "?";
        for(var field in data) {
            qString += field + "=" + data[field] + "&";
        }
        url += qString.slice(0, -1);

		// Add headers
        this.http.defaults.headers['x-access-token'] = Session.getToken();

        // Run the request
        return this.http.fetch(url, {method:"get"}).then(function(stream) {
        	return stream;
        });
	}

	startSpinner() {
		this.spinner.spin();
	}

	stopSpinner() {
		this.spinner.stop();
	}

	sendMessage(message) {

		// Class message spans
		var elts = document.getElementsByClassName('message');
		for(var i=0; i<elts.length; i++) {
			elts[i].innerHTML = message;
		}
		setTimeout(function() { 
			for(var i=0; i<elts.length; i++) {
				elts[i].innerHTML = "";
			}
		}, 3000);
	}

	logout() {
		Session.destroy();
        window.location.replace(this.config.ssoLogoutUrl);
    }
}

SystemUtils.inject = [HttpClient, Configuration];
