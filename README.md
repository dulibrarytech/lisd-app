# Library Instruction Statistics Database

[description]

## Structure
The client-side aspect aka Aurelia application is in the ``client`` folder. This is where you author your Aurelia classes, etc. The server-side aspect is in the ``server`` folder which contains Node.js files, etc. 

# Configuration settings:
Client: config/configuration.js
Server: Create a file named '.env':

####################################
PORT=[port #]
BASE_URL=[Base url of server app]

LISD_ENV=[development|production]

LISD_SECRET=lisdS3cr3tlisdKeY
LISD_CRYPTKEY=lisd&ecr3tlisdCryPtK3y
LDAP_SERVICE=[ldap service url]

DB_HOST=
DB_PORT=
DB_NAME=

ENABLE_BROWSER_TEST=[true to enable browser test on server api routes]
####################################

By default the server ships with Express and is set to serve your Aurelia application from the ``client`` directory.

# Deployment
# To minify client js files:
1. from client/, run "gulp minify-all"
2. Copy all files from dist/src to the corresponding locations in src/

# Start
Dev machine (current) node lisd-server.js

