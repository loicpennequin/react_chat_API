/**
 * Handles controller execution and responds to user.
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';
const path = require('path');
const logger = require(path.join(__dirname, '../middlewares/winston.js'));

const _handler = (promise, params) => async (req, res, next) => {
	const promiseParams = params ? params(req, res, next) : [];
	try {
		const { status, headers, data } = await promise(...promiseParams);
		return res
			.status(status || 200)
			.set(headers ? headers : {})
			.json(
				Object.assign(
					{},
					{ token: req.token },
					data || { message: 'OK' }
				)
			);
	} catch (err) {
		logger.error(err.message);
		return res.status(err.status || 500).json({ error: err.message });
	}
};

const _controllers = {
	User: require(path.join(__dirname, 'UserController.js')),
	Contact: require(path.join(__dirname, 'ContactController.js')),
	ContactRequest: require(path.join(
		__dirname,
		'ContactRequestController.js'
	)),
	Auth: require(path.join(__dirname, 'AuthController.js'))
};

module.exports = Object.keys(_controllers).reduce(
	(acc, key) =>
		Object.assign(acc, {
			[key]: (method, params) =>
				_handler(_controllers[key][method], params)
		}),
	{}
);
