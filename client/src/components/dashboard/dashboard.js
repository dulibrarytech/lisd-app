import 'fetch';
import { customElement, inject } from 'aurelia-framework';
import {Configuration} from '../../../config/configuration';
import {SystemUtils} from '../../utils/SystemUtils.js';
import {Router} from 'aurelia-router';

@inject(SystemUtils, Configuration, Router)
export class Users {

	utils;
	config;
	router;

	activeSession;

	users = [];
	librarians;

	constructor(systemUtils, config, router) {
	  	this.utils = systemUtils;
	  	this.config = config;
	  	this.router = router;

	  	this.activeSession = false;

	  	if(this.config.session.token == null) {
	  		this.router.navigate("/");
	  	}
	  	else {
	  		this.activeSession = true;
	  		this.username = this.config.session.data.fname + " " + this.config.session.data.lname;
	  	}
	}

	attached() {
		this.getUserList();
		this.getLibrarianList();


	}

	getUserList() {
		this.utils.doAjax('user/all', 'get', null, null).then(responseObject => {
            //this.initUserDisplay(responseObject);
            console.log("Client receives: ", responseObject);
            this.users = responseObject.data;
        });
	}

	addUser() {

	}

	editUser() {

	}

	updateUser() {

	}

	removeUser() {

	}

	getLibrarianList() {

	}
}