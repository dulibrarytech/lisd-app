'use strict';
require('dotenv').config();

var settings = {

	"secret": process.env.LISD_SECRET,
	"cryptKey": process.env.LISD_CRYPTKEY,
	"LDAPAuthService": process.env.LDAP_SERVICE,
	"lisdClientHeader": process.env.LISD_CLIENT,
	"ssoHost": process.env.SSO_HOST,
	"ssoClientLoginUrl": process.env.SSO_CLIENT_LOGIN_URL,

	"runtime_env": process.env.LISD_ENV,

	"server": {

		"fiscalYearStart": 		"07-01",
		"fiscalYearEnd": 			"07-01",

		"academicYearStart": 		"09-01",
		"academicYearEnd": 		"09-01",

		"quarter1Start": 			"09-01",
		"quarter1End": 			"12-15",
		"quarter2Start": 			"01-01",
		"quarter2End": 			"03-15",
		"quarter3Start": 			"03-16",
		"quarter3End": 			"06-15",
		"quarter4Start": 			"06-16",
		"quarter4End": 			"08-30"
	}
};

module.exports = settings;

