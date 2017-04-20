import 'fetch';
import { customElement, inject } from 'aurelia-framework';

import {SystemUtils} from '../../utils/SystemUtils.js';

@inject(SystemUtils)
export class Users {
  heading = '';
  userName;
  passWord;


  constructor(systemUtils) {
      this.utils = systemUtils;
  }

  login() {

    var data = {
      username: this.userName,
      password: this.passWord
    }

    this.utils.doAjax('user/login', 'post', data, null).then(responseObject => {
        console.log("Login response");
        console.log(responseObject);
        
    });
  }
}

