export class Configuration {  
  constructor(){
      this.baseUrl = 'http://localhost:9004/';
      this.environment = 'production';

      this.session = {
      	data: null,
      	token: null
      };
  }
}