/**
* Configure winston logging module.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const winston = require('winston');
const path    = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '../../logs/combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        level: 'debug',
        colorize: true
    }));
}

module.exports = logger;
