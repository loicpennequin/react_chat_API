/**
* BookshelfJs config
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

let dbConfig = {
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        charset  : 'utf8'
    }
};

const knex = require('knex')(dbConfig);
const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin('pagination');

module.exports = Bookshelf;
