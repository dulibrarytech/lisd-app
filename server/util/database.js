
module.exports = (function() {

	require('dotenv').config();

	const { MongoClient } = require('mongodb');

	const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
	const client = new MongoClient(url);

	const dbName = process.env.DB_NAME;

	var database = null;

	var connect = async () => {
		try {
			console.log(`Connecting to database ${dbName}..`);
			await client.connect();
			database = client.db(dbName);
		}
		catch(error) {
			console.log(`Database connect error: ${error}`);
		}

		return database;
	};

	return {
		connect: function() {
			return connect();
		},
		connection: function() {
			return database;
		},
		closeConnection: function() {
			database.close();
		}
	};
})()