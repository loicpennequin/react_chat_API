/**
 * Server entry point.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';

const http   = require('./app.js');

const path   = require('path');
const logger = require(path.join(__dirname, '/src/middlewares/winston.js'));

http.listen(process.env.PORT, () => {
    logger.info('===================================');
    logger.info(`server started on port ${process.env.PORT}`);
    logger.info('===================================');
});
