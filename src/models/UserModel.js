/**
* The User model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));


class User extends Bookshelf.Model {
    get tableName() { return 'users'; }
    get hidden() { return ['password']; }

    sentRequests(){
        return this.hasMany('ContactRequest', 'sender_id');
    }

    recievedRequests(){
        return this.hasMany('ContactRequest', 'sendee_id');
    }

    contacts(){
        return this.hasMany('Contact', 'user_id');
    }

    get hasTimestamps() { return true; }
}

module.exports = Bookshelf.model('User', User);
