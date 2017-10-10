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

Release Notes

0.1.x 				(Pre-Admin functionality)

0.1.0	5-23-17		Data entry/data visualization functionality.  
					Librarian user session functionality: Display authenticated librarian in select boxes by default

0.1.1	6-26-17		Remove inactive librarians from select box
					Add feedback message display to login form
					Add global settings class to client for client app settings

0.1.2	7-10-17		Fixed issue with redirect to 403 page upon invalid login credentials
					Temporarily disable Admin link and functionality for agile development

0.1.3	9-11-17		Added "None" option to ACRL framework fields
					Add form validation on course data fields
					Use default value if a property dropdown placeholder is selected
					Automatically submit a 0 for student count value if a field is submitted empty (ease of use)

1.1.x 				(Admin functionality/dashboard implemented)

1.1.0	9-21-17		Add user management
					Add property management
					Add user edit form
					Add property edit form
					Add Class Edit form
					Add comment viewer
					Add "add comment" form to class edit
					Fix bug with "new search" button: Button reverts to original search, does not reload entire app
					Fix date and quarter display bugs on the class edit form
					Add styles to tables and forms

1.1.2	9-21-17		Fix 1.1.0 bugs
					Add fixed header on scrolling data tables
					Add font awesome icons to menu

1.2.1	9-28-17		Fix issues with result table totals
					Remove bugs from table aggregation

1.3.1	10-10-17	Update 'new search' to reset search results options form
					Fix 'insert first comment' bug
					Fix 'single class' chart year totals display
					Fix 'subsort quarter' charts total displays for academic year search
					Reset edit form on new search
					Fix duplicating properties bug on class edit
					Hide class results list when the class edit form is displayed
					Hide the class data results table when the edit class data form is visible
					Auto-update the table when the class edit form is closed
					Add librarian names to the class data table

1.3.2	10-10-17	Add safety to property and user remove button


