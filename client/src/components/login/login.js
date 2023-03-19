import 'fetch';
import { customElement, inject } from 'aurelia-framework';
import {Configuration} from 'config/configuration';
import {SystemUtils} from 'utils/SystemUtils.js';
import {Router} from 'aurelia-router';
import {Session} from 'libs/session.js';

export class Login {

  constructor(systemUtils, config, router) {
      this.utils = systemUtils;
      this.config = config;
      this.router = router;
      this.heading = "";

      if(Session.isSession() == false) {
          let menulink = document.getElementById('menulink-104');
          if(menulink) menulink.style.display = "none";
      }
  }

  canActivate() {
    if(Session.isSession()) {
        this.router.navigate("/");
    }
    else {
      window.location.replace(`${this.config.ssoUrl}?app_url=${this.config.ssoResponseUrl}`);
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
          if(response.sessionData.duid) {
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
          Session.create({userData: response.sessionData}, response.token);

          if(Session.getData('userData').role == 1) {
            this.displayAdminLink(true);
          }

          this.displayLoginButton(false);
          this.router.navigate("/");
        }
    });
  }

  verifyLastname() {

    var data = {
      DUID: this.DUID,
      lastName: this.lastName
    }

    this.utils.doAjax('user/add/DUID', 'post', data, null).then(response => {
      this.utils.stopSpinner();

        if(typeof response == 'undefined' || typeof response.token == 'undefined') {
          console.log("Server authentication error");
        }
        else  {

          if(response.sessionData == null) {
            console.log("Invalid lastname");
            this.utils.sendMessage("Last name not found");
          }
          else {
            console.log(response.sessionData.username + " logged in successfully");
            Session.create({userData: response.sessionData}, response.token);

            if(Session.getData('userData').role == 1) {
              this.displayAdminLink(true);
            }

            this.displayLoginButton(false);
            this.router.navigate("/");
          }
        }

    });
  }

  displayLoginButton(display) {
    document.getElementById('menulink-103').style.display = display == false ? "none" : "inline";
  }

  displayAdminLink(display) {
    document.getElementById('menulink-104').style.display = display == true ? "inline" : "none";
  }
}

Login.inject = [SystemUtils, Configuration, Router];