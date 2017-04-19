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
    console.log("U: " + this.userName + " P: " + this.passWord);

    var data = {
      username: this.userName,
      password: this.passWord
    }

    this.utils.doAjax('user/login', 'post', data, null).then(responseObject => {
        console.log("Login response: Server: " + responseObject.message);
        
    });
  }
}

