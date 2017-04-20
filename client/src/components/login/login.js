import 'fetch';
import { customElement, inject } from 'aurelia-framework';
import {Configuration} from '../../../config/configuration';

import {SystemUtils} from '../../utils/SystemUtils.js';

@inject(SystemUtils, Configuration)
export class Users {

  heading = '';
  config;
  userName;
  passWord;


  constructor(systemUtils, config) {
      this.utils = systemUtils;
      this.config = config;
  }

  login() {

    var data = {
      username: this.userName,
      password: this.passWord
    }

    this.utils.doAjax('user/login', 'post', data, null).then(responseObject => {
        //this.config.session = responseObject.passport;
        //console.log("Login Stored session data");
        //console.log(this.config.session);

        console.log("login() response object:");
        console.log(responseObject);
    });
  }
}

