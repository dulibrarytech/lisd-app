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
		if(this.config.session.token) {
			this.getUserList();
			this.resetUserDataForm();
		  	this.showUserDataForm(false);
		}
	}

	resetUserDataForm() {
		this.userData = {
			userID: "",
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

	showUserDataForm(show) {
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
            	this.showUserDataForm(false);
            }
        });
	}

	// Get the selected user data and populate the user data form 
	editUser(userID) {
		console.log("Edit user ", userID);
		this.utils.doAjax('user/get', 'get', {userID: userID}, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not add user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.userData.userID = response.data._id;
            	this.userData.duid = response.data.duid;
            	this.userData.firstname = response.data.firstname;
            	this.userData.lastname = response.data.lastname;
            	this.userData.role = this.roles[response.data.role-1];
            	this.showUserDataForm(true);
            }
        });
	}

	updateUser() {
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


	}

	removeUser() {

	}
}