// module.exports = {
//   "bundles": {
//     "src/dist/app-build": {
//       "includes": [
//         '[*.js]',
//         '*.html!text',
//         '*.css!text'
//       ],
//       "options": {
//         "inject": true,
//         "minify": true,
//         "depCache": true,
//         "rev": false
//       }
//     }
//   }
// };

module.exports = {
  "bundles": {
    "dist/utils/lisd-app": {
      "includes": [
        "[*.js]",
        "*.html!text",
        "*.css!text"
        
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": false
      }
    }
  }
};


// ,
//     "dist/aurelia": {
//       "includes": [
//         "aurelia-framework",
//         "aurelia-bootstrapper",
//         "aurelia-fetch-client",
//         "aurelia-router",
//         "aurelia-animator-css",
//         "aurelia-templating-binding",
//         "aurelia-polyfills",
//         "aurelia-templating-resources",
//         "aurelia-templating-router",
//         "aurelia-loader-default",
//         "aurelia-history-browser",
//         "aurelia-logging-console",
//         "bootstrap",
//         "bootstrap/css/bootstrap.css!text",
//         "fetch",
//         "jquery"
//       ],
//       "options": {
//         "inject": true,
//         "minify": true,
//         "depCache": false,
//         "rev": false
//       }
//     }
