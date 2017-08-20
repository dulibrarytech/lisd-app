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
	userData={};
	roles=[];
	librarians;

	constructor(systemUtils, config, router) {
	  	this.utils = systemUtils;
	  	this.config = config;
	  	this.router = router;

	  	this.activeSession = false;
	  	this.resetUserDataForm();
	  	this.showAddUserForm(false);

	  	this.roles = ["Admin", "Librarian"];

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
	}

	resetUserDataForm() {
		this.userData = {
	  		duid: "",
	  		firstname: "",
	  		lastname: "",
	  		role: ""
	  	};
	}

	getUserList() {
		this.utils.doAjax('user/all', 'get', null, null).then(responseObject => {
            //this.initUserDisplay(responseObject);
            console.log("User list: ", responseObject);
            this.users = responseObject.data;
        });
	}

	showAddUserForm(show) {
		// Show user data form
		document.getElementById('user-data-form').style.display = show == true ? "block" : "none";
	}

	addUser() {

		switch(this.userData.role) {
			case "Admin":
				this.userData.role = 1;
				break;
			case "Librarian":
				this.userData.role = 2;
				break;
			default:
				this.userData.role = 2;
				break;
		}

		this.utils.doAjax('user/add', 'get', this.userData, null).then(response => {
            //this.initUserDisplay(responseObject);
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not add user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.utils.sendMessage("User added");
            	console.log("User added");
            	this.users.push(this.userData);
            	this.resetUserDataForm();
            	this.showAddUserForm(false);
            }
        });
	}

	editUser() {

	}

	updateUser() {

	}

	removeUser() {

	}
}