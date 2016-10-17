'use strict'

import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
let httpClient = new HttpClient();

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
        console.log(this.http);
	}

	doAjax(url, method, data, callback) {
		console.log(data);
	}
}

