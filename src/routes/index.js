/**
* Define all REST endpoints.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path            = require('path');

const logRequest      = require(path.join(__dirname, '../middlewares/logRequest.js'));
const publicRouter    = require(path.join(__dirname, 'routers/publicRouter.js'));
const privateRouter   = require(path.join(__dirname, 'routers/privateRouter.js'));
const AuthCtrl        = require(path.join(__dirname, '../controllers/AuthController.js')) ;

module.exports = app => {
    app.use('/api', logRequest);
    app.use('/api', publicRouter);
    app.use('/api', AuthCtrl.ensureAuth, AuthCtrl.refreshToken, privateRouter);
};
