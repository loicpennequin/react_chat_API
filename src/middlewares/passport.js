/**
* Passport configuration.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path              = require('path');
const bcrypt            = require('bcrypt');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const model            = require(path.join(__dirname, '../models'));

const comparePassword = (password, user, done) =>
    bcrypt.compare(password, user.password, (err, result) =>
        result !== true
            ? done(null, false)
            : done(null, user.id));

const getUser = async (field, value) => (
    await model.User
        .where(field, value)
        .fetch()
).serialize();

const authenticate = async (username, password, done) => {
    try{
        const user = await getUser('username', username);
        return user ? comparePassword(password, user, done) : done(null, false);
    } catch(err) {
        return done(err) ;
    }
};

const ensureAuth = async (jwt_payload, done) => {
    try{
        const user = await getUser('id', jwt_payload.data.id);
        done(null, { id : user.id } );
    } catch(err) {
        return done(err) ;
    }
};

module.exports = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },authenticate));

    passport.use('jwt', new JwtStrategy({
        secretOrKey : process.env.TOKEN_SECRET,
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    }, ensureAuth));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
};
