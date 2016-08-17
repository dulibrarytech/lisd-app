import {Router} from 'aurelia-router';

export class Welcome {

  static inject() { return [Router]; }

  constructor(router){
    this.theRouter = router;
  }

  heading = "Welcome to the Data Warehouse App!";
  
  start() {
    this.theRouter.navigate("users");
    console.log("start");
  }
}

