/*
 * Frontend configuration class
 * This file is not meant to be user readable, and is to be updated via admin menu
 * TODO: Add admin menu to update the class attributes below
 */
export class Configuration {  
  constructor(){
      this.baseUrl = 'http://localhost:9004/';
      this.clientPath = '';
      this.environment = 'development';
      this.ssoUrl = "";
      this.ssoResponseUrl = "";
      this.ssoLogoutUrl = "";

      this.session = {
      	data: null,
      	token: null
      };

      // "Table" | "Chart"
      this.defaultStatisticsFormat = "Table";
  }
}