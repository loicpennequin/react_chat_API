'use strict';

require('dotenv').config({
	path: 'config/.env'
});

let cfg = {
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD || '',
		charset: 'utf8'
	}
};

module.exports = cfg;
