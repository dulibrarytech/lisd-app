# Library Instruction Statistics Database

## Structure
The client-side aspect aka Aurelia application is in the ``client`` folder. This is where you author your Aurelia classes, etc. The server-side aspect is in the ``server`` folder which contains Node.js files, etc. 

# Configuration settings:
Client: config/configuration.js

By default the server ships with Express and is set to serve your Aurelia application from the ``client`` directory.

# Deployment
# To minify client js files:
1. from client/, run "gulp minify-all"
2. Copy all files from dist/src to the corresponding locations in src/

# Start
Dev machine (current) node lisd-server.js
