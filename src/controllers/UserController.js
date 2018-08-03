/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

"use strict";

const path = require("path");
const bcrypt = require("bcrypt");
const models = require(path.join(__dirname, "../models"));
const { validationResult } = require("express-validator/check");

class UserController {
    static async register(req) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return { status: 422, data: { errors: errors.array() } };
        }

        const post = Object.assign(req.body, {
            password: await bcrypt.hash(req.body.password, 10)
        });
        await models.User.forge(post).save();

        return {
            status: 201
        };
    }

    static async fetchById(id) {
        console.log(id);
        return {
            data: (await models.User.where("id", id).fetch({
                withRelated: [
                    "contacts.user",
                    "sentRequests.sendee",
                    "recievedRequests.sender"
                ]
            })).toJSON()
        };
    }

    static async update(body) {
        await models.User.forge(body).save({method: 'update', patch: true});
        return {
            status: 201
        };
    }
}

module.exports = UserController;
