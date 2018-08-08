'use strict';

const path = require('path');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const ctrl = require(path.join(__dirname, '../../controllers'));
const fs = require('fs');
const validators = require(path.join(
	__dirname,
	'../../services/validators.js'
));
const imageUpload = require('./../../services/imageUpload.js');

router.get('/isloggedIn', (req, res) => {
	res.json({ authenticated: true });
});
router.get('/users', (req, res, next) =>
	ctrl.User('fetchAll', (req, res, next) => [req.query])(req, res, next)
);
router.get('/users/:id', (req, res, next) =>
	ctrl.User('fetchById', (req, res, next) => [req.params.id])(req, res, next)
);
router.post('/requests', (req, res, next) =>
	ctrl.ContactRequest('sendRequest', req => [req.body])(req, res, next)
);
router.get('/requests/:id/accept', (req, res, next) =>
	ctrl.ContactRequest('acceptRequest', req => [req.params.id])(req, res, next)
);
router.get('/requests/:id/deny', (req, res, next) =>
	ctrl.ContactRequest('denyRequest', req => [req.params.id])(req, res, next)
);
router.put('/users/:id', upload.single('avatar'), (req, res, next) =>
	ctrl.User('update', (req, res, next) => [req])(req, res, next)
);

module.exports = router;
