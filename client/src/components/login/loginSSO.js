'use strict'

import {SystemUtils} from '../../utils/SystemUtils.js';
import {Configuration} from '../../config/configuration.js';
import {Router} from 'aurelia-router';
import {JWTDecode} from '../../libs/jwt-decode.js';
import {Session} from 'libs/session.js';

export class Login {
  
  constructor(systemUtils, configuration, router) {
    this.utils = systemUtils;
    this.config = configuration;
    this.router = router;
  }

  canActivate(qparams) {
    this.loginSSO(qparams.token);
  }

  loginSSO(token = null) {
    if(token) {
        // parse token
        let userData = JWTDecode.jwtDecode(token) || {};

        // add userdata (token payload) to session, add token string to session
        Session.create({userData}, token);

        // set ui state
        if(userData.role == 1) {
            this.displayAdminLink(true);
        }
        this.displayLoginButton(false);

        // navigate to form (dashboard)
        this.router.navigate("/");
    }
    else console.error("SSO token not found")
  }

  displayLoginButton(display) {
    let loginLink = document.getElementById('menulink-103');
    if(loginLink) loginLink.style.display = display == true ? "inline" : "none";
  }

  displayAdminLink(display) {
    let adminLink = document.getElementById('menulink-104');
    if(adminLink) adminLink.style.display = display == true ? "inline" : "none";
  }
}

Login.inject = [SystemUtils, Configuration, Router];