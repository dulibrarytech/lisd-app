var locationModel = require("../models/Location");
var departmentModel = require("../models/Department");

var getProperty = function(name) {
	var property;
	switch(name) {
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
	return property;
}

module.exports.propertyAll = function(req, res) {

	getProperty(req.params.name).getAll(function(data) {
		res.send(data);
	});
};

module.exports.propertyGet = function(req, res) {

	getProperty(req.params.name).getData(req.query.id, function(data) {
		res.send(data);
	});
};