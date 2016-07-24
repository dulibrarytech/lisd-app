import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';

export class Users {
  heading = 'Enter New User Data!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);

    // set local active user profile

    // redirect to play.html
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}