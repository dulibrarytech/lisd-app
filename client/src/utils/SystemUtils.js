'use strict'

import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
//let httpClient = new HttpClient();

@inject(HttpClient)
export class SystemUtils {

	http;

	constructor(httpClient) {

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
	}

	doAjax(url, method, data, callback) {
		console.log("AJAX " + method);
        var options = {
        	method: method
        }

        if(method == 'post' && data != null) {
        	options['body'] = json(data);
        }

        // TODO: Add headers

        // TODO Start spinner
        console.log("Spinner start");

        this.http.fetch(url, options).then(response => response.json())
        .then(data => {
        	// TODO Stop spinner
        	console.log("Spinner stop");
            callback(data);
            return data;
        });
	}
}

