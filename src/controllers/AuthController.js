/**
* Example controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const passport  = require('passport');
const jwt       = require('jsonwebtoken');

class AuthController{
    static async authenticate(req, res, next){
        return{
            status: 201,
            data: await AuthController._authenticate(req, res, next)
        };
    }

    static _authenticate(req, res, next){
        return new Promise((resolve, reject) => {
            passport.authenticate('local', {session: false}, (err, user) => {
                if (err) {
                    reject(new Error(err));
                }
                if (!user){
                    reject(new Error('User not found.'));
                }

                resolve({
                    token : AuthController.generateToken(user),
                    userId : user
                })
            })(req, res, next);
        })
    }

    static generateToken(user){
        return jwt.sign(
            {data: {id: user}, timestamp : new Date()},
            process.env.TOKEN_SECRET,
            {expiresIn: 3600}
        );
    }

    static refreshToken(req, res, next){
        //@FIXME this is placeholder code, need to implement a decent token refresh logic
        req.token = AuthController.generateToken(req.user.id);
        next();
    }

    static ensureAuth(req, res, next){
        passport.authenticate('jwt', {session: false})(req, res, next);
    }
}

module.exports = AuthController;
