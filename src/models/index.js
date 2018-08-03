/**
* Registers all models.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path = require('path');

module.exports = {
    User : require(path.join(__dirname, 'UserModel.js')),
    Contact : require(path.join(__dirname, 'ContactModel.js')),
    ContactRequest : require(path.join(__dirname, 'ContactRequestModel.js')),
};
