/*
* Contact controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

"use strict";

const path = require("path");
const models = require(path.join(__dirname, "../models"));

class ContactRequestController {
    static async sendRequest(body) {
        await models.ContactRequest.forge(body).save();
        return {
            status: 201
        };
    }

    static async acceptRequest(id) {
        const request = (await models.ContactRequest.where(
            "id",
            id
        ).fetch()).toJSON();
        const contacts = [
            models.Contact.forge({
                user_id: request.sender_id,
                contact_id: request.sendee_id
            }).save(),
            models.Contact.forge({
                user_id: request.sendee_id,
                contact_id: request.sender_id
            }).save()
        ];
        await Promise.all(contacts);
        await models.ContactRequest
            .forge("id", id)
            .destroy();
        return {
            status: 200
        };
    }

    static async denyRequest(id) {
        await models.ContactRequest
            .forge("id", id)
            .destroy();
        return {
            status: 200
        }
    }
}

module.exports = ContactRequestController;
