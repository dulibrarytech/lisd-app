export class Configuration {  
  constructor(){
      this.baseUrl = 'http://localhost:9004/';
      this.clientPath = '';
      this.environment = 'development';

      this.session = {
      	data: null,
      	token: null
      };

      // "Table" | "Chart"
      this.defaultStatisticsFormat = "Table";
  }
}