const passport = require('passport');
const googleStratigy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const users = require('../models/users');

passport.use(new googleStratigy({
    clientID: '533335247674-ccbrts5j6antnqcbtfh1hj5s0pf7ld40.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:2000/users/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        users.findOne({ email: profile.emails[0].value }).exec((err, user) => {
            if (err) {
                console.log('error in google stratigy passport', err);
                return;
            }
            console.log(profile);
            if (user) {
                //if found set this as req.user
                return done(null, user);
            }
            else {
                users.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, (err, user) => {
                    if (err) {
                        console.log('error in creating user google stratigy passport', err);
                        return;
                    }
                    else {
                        return done(null, user);
                    }
                })
            }
        })
    }))

module.exports = passport;