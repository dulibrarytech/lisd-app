import 'bootstrap';
import {Configure} from "aurelia-configuration";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-configuration');

  // aurelia.use
  //       .standardConfiguration()
  //       .plugin('aurelia-i18n', (instance) => {
  //               let configInstance = aurelia.container.get(Configure);
  //               let apiEndpoint = configInstance.get('api.endpoint');

  aurelia.start().then(() => aurelia.setRoot());
}