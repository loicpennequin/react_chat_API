'use strict';

const path = require('path');
const router = require('express').Router();
const ctrl = require(path.join(__dirname, '../../controllers'));
const validators = require(path.join(
    __dirname,
    '../../services/validators.js'
));

router.get('/isloggedIn', (req, res) =>{
    res.json({authenticated: true});
});
router.get('/user/:id', (req, res, next) =>
    ctrl.User('fetchById', (req, res, next) => [req.params.id])(req, res, next)
);
router.post('/request', (req, res, next) =>
    ctrl.ContactRequest('sendRequest', req => [req.body])
);
module.exports = router;
