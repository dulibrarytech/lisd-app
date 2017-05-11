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


  constructor(systemUtils, config, router) {
      this.utils = systemUtils;
      this.config = config;
      this.router = router;
      
  }

  login() {

    var data = {
      username: this.userName,
      password: this.passWord
    }
  
    this.utils.doAjax('user/login', 'post', data, null).then(response => {
        //this.config.session = responseObject.passport;
        //console.log("Login Stored session data");
        //console.log(this.config.session);

        console.log("login() response:");
        console.log(response);
        if(response.token == null) {
          // send message
          console.log("Invalid username or password");
          // clear login form
        }
        else {
          this.config.session = response.sessionData;
          this.config.session['token'] = response.token;
          console.log("Session:");
          console.log(this.config);
          this.router.navigate("/");
        }
    });
  }
}

