/**
 * Server entry point.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';
//Developpement environnement variables
require('dotenv').config({
	path: 'config/.env'
});

//Dependancies
const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

//Express config
const app = express();
const http = require('http').Server(app);

//Passport config
require(path.join(__dirname, 'src/middlewares/passport.js'))();

//App config
app.disable('x-powered-by');
app.use(require(path.join(__dirname, 'src/middlewares/allowCors.js')));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//routes config
require(path.join(__dirname, 'src/routes'))(app);
app.get('/', (req, res) => {
	process.env.NODE_ENV === 'development'
		? res.redirect(process.env.APP_URL)
		: res.sendFile('index.html');
});

app.use((err, req, res) => {
	if (err.name === 'UnauthorizedError') {
		res.sendStatus(401);
	}
});

// Socket.io config
require(path.join(__dirname, 'src/socketIo')).init(http);

module.exports = http;
