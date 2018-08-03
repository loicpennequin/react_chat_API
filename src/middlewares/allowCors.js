/**
* CORS configuration.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    req.method === 'OPTIONS' ? res.sendStatus(200) : next();
};
