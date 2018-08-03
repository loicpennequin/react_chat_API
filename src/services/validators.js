/**
 * Handles forms validation
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const { check } = require('express-validator/check');

module.exports.register = [
    check('password')
        .exists()
        .withMessage('Password is required.')
        .isLength({min: 6})
        .withMessage('Password should be at least 6 characters long.'),
    check('username')
        .exists()
        .withMessage('Username is required.')
        .isLength({min: 4, max: 16})
        .withMessage('Username should be between 4 and 16 characters long.'),
    check('email')
        .exists()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Email must be a valid email address.')
];
