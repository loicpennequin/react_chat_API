/**
* The Contact model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));

class Contact extends Bookshelf.Model {
    get tableName() { return 'contacts'; }

    contact(){
        return this.belongsTo('User', 'contact_id');
    }

    user(){
        return this.belongsTo('User', 'user_id');
    }
}

module.exports = Bookshelf.model('Contact', Contact);
