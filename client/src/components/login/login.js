import 'fetch';
import { customElement, inject } from 'aurelia-framework';
import {Configuration} from '../../../config/configuration';
import {SystemUtils} from '../../utils/SystemUtils.js';
import {Router} from 'aurelia-router';

@inject(SystemUtils, Configuration, Router)
export class Users {

  heading = '';
  config;
  userName;
  passWord;
  lastName;
  DUID;


  constructor(systemUtils, config, router) {
      this.utils = systemUtils;
      this.config = config;
      this.router = router;

      if(this.config.session.token == null) {
          document.getElementById('menulink-104').style.display = "none";
      }
  }

  login() {

    var data = {
      username: this.userName,
      password: this.passWord
    }
  
    this.utils.doAjax('user/login', 'post', data, null).then(response => {
      this.utils.stopSpinner();

        if(typeof response == 'undefined' || typeof response.token == 'undefined') {
          console.log("Server authentication error");
        }
        else if(response.token == null) {

          // DUID valid, request to verify as LISD user via last name
          if(response.sessionData.duid != 'undefined') {
            console.log("DUID resp:", response);
            document.getElementById('login-form').style.display = "none";
            document.getElementById('lname-verify-form').style.display = "block";
            this.DUID = response.sessionData.duid;
          }
          // Failed auth
          else {
            // send message
            console.log("Invalid username or password");
            // clear login form
            document.getElementById('username-input').value = "";
            document.getElementById('password-input').value = "";
            this.utils.sendMessage("Invalid DUID or password");
          }
        }
        else {
          console.log(response.sessionData.username + " logged in successfully");
          this.config.session.data = response.sessionData;
          this.config.session.token = response.token;

          if(this.config.session.data.role == '1') {
            // Show admin link (to dashboard route)
            //this.displayAdminLink(true);  // TEMP
          }

          this.displayLoginButton(false);
          this.router.navigate("/");
        }
    });
  }

  verifyLastname() {
    // var data = {
    //   DUID: this.DUID,
    //   lastName: this.lastName
    // }
    var data = {
      DUID: this.DUID,
      lastName: this.lastName
    }
    console.log("Posting data:", data);
    this.utils.doAjax('user/add/DUID', 'post', data, null).then(response => {
      this.utils.stopSpinner();

        if(typeof response == 'undefined' || typeof response.token == 'undefined') {
          console.log("Server authentication error");
        }
        else  {
          console.log("RX", response);

          console.log(response.sessionData.username + " logged in successfully");
          this.config.session.data = response.sessionData;
          this.config.session.token = response.token;

          if(this.config.session.data.role == '1') {
            // Show admin link (to dashboard route)
            //this.displayAdminLink(true);  // TEMP
          }

          this.displayLoginButton(false);
          this.router.navigate("/");
        }

    });
  }

  displayLoginButton(display) {

    var elements = document.getElementsByClassName('au-target');
    for(var i=0; i<elements.length; i++) {
      if(elements[i].text == "Login") {
          elements[i].style.display = display == false ? "none" : "inline";
      }
    }
  }

  displayAdminLink(display) {
    document.getElementById('menulink-104').style.display = display == true ? "inline" : "none";
  }
}

