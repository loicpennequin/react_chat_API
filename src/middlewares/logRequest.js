/**
* Logs every HTTP Request to the console
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path     = require('path');
const logger   = require(path.join(__dirname, 'winston.js'));

module.exports = (req, res, next) => {
    logger.debug(`REST API request : ${req.method} | ${req.url}`);
    next();
};
