var locationModel = require("../models/Location");
var departmentModel = require("../models/Department");

module.exports.propertyAll = function(req, res) {
	console.log("propAll:", req.params.name);
	var property;

	switch(req.params.name) {
		case "location":
			property = locationModel;
			break;
		case "department":
			property = departmentModel;
			break;
		default:
			res.sendStatus(500);
			break;
	}

	property.getAll(function(data) {
		console.log("CB data", data);
		res.send("OK " + req.params.name);
	});
};