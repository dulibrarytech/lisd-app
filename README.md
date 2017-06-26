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

LISD_ENV=[dev|prod]

LISD_SECRET=lisdS3cr3tlisdKeY
LISD_CRYPTKEY=lisd&ecr3tlisdCryPtK3y
LDAP_SERVICE=[ldap service url]

DB_HOST=
DB_PORT=
DB_NAME=
####################################

By default the server ships with Express and is set to serve your Aurelia application from the ``client`` directory.

Release Notes

0.1.0	5-23-17		Data entry/data visualization functionality.  
					Librarian user session functionality: Display authenticated librarian in select boxes by default

0.1.1	6-26-17		Remove inactive librarians from select box
					Add feedback message display to login form
					Add global settings class to client for client app settings


