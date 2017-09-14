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
	properties = [];
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
		  	this.showDataForm(false);
		}
		else {
-			this.router.navigate("/");
 		}
	}

	resetUserDataForm() {
		this.userData = {
			userID: null,
	  		duid: "",
	  		firstname: "",
	  		lastname: "",
	  		role: "Librarian"
	  	};
	}

	getUserList() {
		this.utils.doAjax('user/all', 'get', null, null).then(responseObject => {
            console.log("User list: ", responseObject);
            this.users = responseObject.data;
            	console.log("User list stored", this.users);

            // Hide user list, show property list
			document.getElementById('user-data-section').style.display = "block";
			document.getElementById('property-data-section').style.display = "none";
        });
	}

	getPropertyList(property) {
		var url = "property/all/" + property, properties = [];
			console.log("Request url", url);
		this.utils.doAjax(url, 'get', null, null).then(responseObject => {

			// Will contain name, isActive.
            console.log("Property list", responseObject);

            for(var index of responseObject.data) {
            	properties.push({
            		name: index.name,
            		isActive: index.isActive,
            		type: property
            	});
            	console.log("Index:", index);
            }

            // Build object with name, isActive, type (add property name)
            this.properties = properties;
            	console.log("Property list stored", this.properties);

            // Hide user list, show property list
			document.getElementById('user-data-section').style.display = "none";
			document.getElementById('property-data-section').style.display = "block";
        });
	}

	showDataForm(show) {
		// Show user data form
		//document.getElementById('user-data-form').style.display = show == true ? "block" : "none";

		var elements = document.getElementsByClassName('data-input-form');
	    for(var i=0; i<elements.length; i++) {
	        elements[i].style.display = show == true ? "block" : "none";
	  }
	}

	addUser() {
		this.resetUserDataForm();
		this.showDataForm(true);
	}

	submitNewUserData() {

		this.userData.role = this.roles.indexOf(this.userData.role)+1;

		this.utils.doAjax('user/add', 'post', this.userData, null).then(response => {
            //this.initUserDisplay(responseObject);
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not add user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.utils.sendMessage("User added");
            	this.users.push(this.userData);
            	this.resetUserDataForm();
            	this.showDataForm(false);
            }
        });
	}

	submitUserData() {
		if(this.userData.userID) {
			this.updateUser();
		}
		else {
			this.submitNewUserData();
		}
	}

	// Get the selected user data and populate the user data form 
	editUser(userID) {

		this.utils.doAjax('user/get', 'get', {userID: userID}, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not get user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.userData.userID = userID;
            	this.userData.duid = response.data.duid;
            	this.userData.firstname = response.data.firstname;
            	this.userData.lastname = response.data.lastname;
            	this.userData.role = this.roles[response.data.role-1];
            	this.showDataForm(true);
            }
        });
	}

	// Updates "active" user (Selected from users list)
	updateUser() {

		this.userData.role = this.roles.indexOf(this.userData.role)+1;

		this.utils.doAjax('user/update', 'put', this.userData, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not update user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.utils.sendMessage("User updated");

            	// Update the users list
            	for(var index of this.users) {

            		// Update the local user list
            		if(index._id == this.userData.userID) {
            			index.duid = this.userData.duid;
            			index.username = this.userData.username;
            			index.firstname = this.userData.firstname;
            			index.lastname = this.userData.lastname;
            			index.role = this.userData.role;
            		}
            	}
            }
        });
	}

	removeUser(userID) {
		this.utils.doAjax('user/remove', 'delete', {userID: userID}, null).then(response => {
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not remove user");
            	console.log("Error: ", response.message);
            }
            else {
            	this.utils.sendMessage("User removed");

            	// Update the users list
            	// for(var index of this.users) {

            	// 	//console.log("DREMTEST1: userID:", userID);

            	// 	// Update the local user list
            	// 	if(index._id == userID) {
            	// 		index.duid = this.userData.duid;
            	// 		index.username = this.userData.username;
            	// 		index.firstname = this.userData.firstname;
            	// 		index.lastname = this.userData.lastname;
            	// 		index.role = this.userData.role;
            	// 	}
            	// }
            	this.getUserList();
            }
        });
	}
}