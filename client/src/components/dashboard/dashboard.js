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
	propData={};
	propActive;
	roles=[];
	librarians;

	constructor(systemUtils, config, router) {
	  	this.utils = systemUtils;
	  	this.config = config;
	  	this.router = router;

	  	this.activeSession = false;
	  	this.roles = ["Admin", "Librarian"];
	  	this.propActive = ["No", "Yes"];

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
			this.resetPropertyDataForm();
		  	this.showDataForm(false);
		}
		else {
			this.router.navigate("/");
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

	resetPropertyDataForm() {
		this.propData = {
			id: null,
	  		name: "",
	  		isActive: true
	  	};
	}

	getUserList() {

		this.showDataForm(false);
		this.utils.doAjax('user/all', 'get', null, null).then(responseObject => {
            this.users = responseObject.data;

            // Hide user list, show property list
			document.getElementById('user-data-section').style.display = "block";
			document.getElementById('property-data-section').style.display = "none";
        });
	}

	getPropertyList(property) {

		this.showDataForm(false);
		var url = "property/all/" + property, properties = [];
		this.utils.doAjax(url, 'get', null, null).then(responseObject => {

            for(var index of responseObject.data) {
            	properties.push({
            		id: index._id,
            		name: index.name,
            		isActive: index.isActive,
            		type: property
            	});
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

	addProperty(type) {
		this.resetPropertyDataForm();
		this.showDataForm(true);
	}

	submitNewUserData() {

		this.userData.role = this.roles.indexOf(this.userData.role)+1;

		this.utils.doAjax('user/add', 'post', this.userData, null).then(response => {
            //this.initUserDisplay(responseObject);
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not add user");
            	console.log(response.message);
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

	submitPropertyData(type) {
			console.log("Current propdata:", this.propData);
			console.log("Current propertylist:", this.properties);
		if(this.propData.id) {
			this.updateProperty(type);
		}
		else {
			this.submitNewPropertyData(type);
		}
	}

	submitNewPropertyData(type) {
		var url = "property/add" + type;
		this.utils.doAjax(url, 'post', this.propData, null).then(response => {
            //this.initUserDisplay(responseObject);
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not add " + type + " property");
            	console.log(response.message);
            }
            else {
            	this.utils.sendMessage(type + " property added");
            	//this.users.push(this.userData);
            	this.resetPropertyDataForm();
            	this.showDataForm(false);
            }
        });
	}

	// Get the selected user data and populate the user data form 
	editUser(userID) {

		this.utils.doAjax('user/get', 'get', {userID: userID}, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not get user");
            	console.log(response.message);
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

	// Updates selected user
	updateUser() {

		this.userData.role = this.roles.indexOf(this.userData.role)+1;

		this.utils.doAjax('user/update', 'put', this.userData, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not update user");
            	console.log(response.message);
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
            	console.log(response.message);
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

	// Get the selected property data and populate the data form 
	editProperty(type, propertyID) {

		var url = "property/get/" + type;
		this.utils.doAjax(url, 'get', {id: propertyID}, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not get " + type + "s");
            	console.log(response.message);
            }
            else {
            	var isActive = response.data[0].isActive === false ? 0 : 1;
            	this.propData.id = propertyID;
            	this.propData.name = response.data[0].name;
            	this.propData.isActive = this.propActive[isActive];
            	this.propData.type = type;

            	this.showDataForm(true);
            }
        });
	}

	// Updates selected property
	updateProperty(type) {

		var url = "property/update/" + type;
		this.utils.doAjax(url, 'put', this.propData, null).then(response => {
			if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not update " + type + "s");
            	console.log(response.message);
            }
            else {
            	this.utils.sendMessage(type + " updated");

            	// Update the users list
            	for(var index of this.propData) {

            		// Update the local user list
            		if(index._id == this.propData.id) {
            			index.name = this.propData.name;
            			index.isActive = this.propData.isActive == "Yes" ? true : false;
            		}
            	}
            }
        });
	}

	removeProperty(type, propertyID) {
		var url = "property/remove/" + type;
		this.utils.doAjax(url, 'delete', {userID: userID}, null).then(response => {
            if(response.status == "error") {
            	this.utils.sendMessage("Server error: Could not remove " + type + "s");
            	console.log(response.message);
            }
            else {
            	this.utils.sendMessage(type + " removed");
            	this.getUserList();
            }
        });
	}
}