/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const models = require(path.join(__dirname, '../models'));
const { validationResult } = require('express-validator/check');
const imageUpload = require(path.join(__dirname, '../services/imageUpload.js'));

class UserController {
	static async register(req) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return { status: 422, data: { errors: errors.array() } };
		}

		const post = {
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10)
		};

		await models.User.forge(post).save();

		return {
			status: 201
		};
	}

	static async fetchAll(queryParams) {
		return {
			data: {
				users: (await models.User.query(qb =>
					qb.where('username', 'LIKE', `%${queryParams.like}%`)
				).fetchAll()).toJSON()
			}
		};
	}

	static async fetchById(id) {
		return {
			data: (await models.User.where('id', id).fetch({
				withRelated: [
					'contacts.user',
					'sentRequests.sendee',
					'recievedRequests.sender'
				]
			})).toJSON()
		};
	}

	static async update(req) {
		if ( req.file ){
			req.body.avatar_url = req.file.filename;
			console.log(req.file.path);
			// await imageUpload.upload(req.file.path);
			await fs.unlink(req.file.path);
		}
		delete req.body['password confirm'];
		await models.User.forge(req.body).save({ method: 'update', patch: true });
		return {
			status: 201
		};
	}
}

module.exports = UserController;
