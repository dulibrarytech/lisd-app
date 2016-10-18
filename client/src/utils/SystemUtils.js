'use strict'

import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
//let httpClient = new HttpClient();



@inject(HttpClient)
export class SystemUtils {

	http;
	spinner;

	constructor(httpClient) {

		// HTTP
		if(typeof httpClient != 'undefined') {
			httpClient.configure(config => {
	            config
	                .withBaseUrl('http://localhost:9004/')
	                .withDefaults({
	                    headers: {
	                        'Accept': 'application/json'
	                    }
	                });
	        });
		}
        this.http = httpClient;

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
		console.log(this.spinner);
	}

	doAjax(url, method, data, callback) {

        var options = {
        	method: method
        }

        if(method == 'post' && data != null) {
        	options['body'] = json(data);
        }

        // TODO: Add headers

        // Start spinner
        var target = document.getElementById('content');
        this.spinner.spin();
        target.appendChild(this.spinner.el);

        // Run the request
        this.http.fetch(url, options).then(response => response.json())
        .then(data => {

        	this.spinner.stop();
            callback(data);
        });
	}
}

