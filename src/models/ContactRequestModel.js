/**
* The contactRequest model.
* handles CRUD methods with the contact_requests table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));

class ContactRequest extends Bookshelf.Model {
    get tableName() { return 'contacts_requests'; }

    sender(){
        return this.belongsTo('User', 'sender_id');
    }

    sendee(){
        return this.belongsTo('User', 'sendee_id');
    }
}

module.exports = Bookshelf.model('ContactRequest', ContactRequest);
