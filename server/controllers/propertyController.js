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

module.exports.propertyAdd = function(req, res) {
		console.log("Data received:", req.body);
	var data = {};
        data['name'] = req.body.name || "";
        data['isActive'] = req.body.isActive == "Yes" ? true : false;
	getProperty(req.params.name).addData(req.body.data, function(data) {
		res.send(data);
	});
};

module.exports.propertyUpdate = function(req, res) {
    var propertyID = req.body.id, data = {};
        data['name'] = req.body.name || "";
        data['isActive'] = req.body.isActive == "Yes" ? true : false;

        	console.log("DEV: Prop update model gets:", propertyID, data);

    getProperty(req.params.name).updateData(propertyID, data, function(response) {
    	res.send(data);
    });
};

module.exports.propertyRemove = function(req, res) {
	getProperty(req.params.name).removeData(req.body.id, function(data) {
		res.send(data);
	});
};