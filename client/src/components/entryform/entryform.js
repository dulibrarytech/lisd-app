
export class EntryForm {

	email = '';
   password = '';

   signup() {
      var myUser = { email: this.email, password: this.password };
      console.log(myUser);
   };
}

