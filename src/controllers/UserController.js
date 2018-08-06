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
		const uploadAvatar = () =>
			new Promise((res, rej) => {
				imageUpload.upload(req.file.path, result => {
					req.body.avatar_url = result;
					fs.unlink(req.file.path);
					res();
				});
			});
		if (req.file) {
			await uploadAvatar();
		}
		delete req.body['password confirm'];
		return {
			status: 201,
			data: (await models.User.where('id', req.params.id).save(req.body, {
				method: 'update',
				patch: true
			})).toJSON()
		};
	}
}

module.exports = UserController;
