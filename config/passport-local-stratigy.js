const passport = require("passport");
const localstratigy = require("passport-local").Strategy;
const user = require("../models/users")


//authentication using passport
passport.use(new localstratigy({
    usernameField: "email",
    passReqToCallback: true
},
    (req, email, password, done) => {
        //find a user and establish the identity
        user.findOne({ email: email }, (err, user) => {
            if (err) {
                req.flash('error', err)
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error', "invalid username/password")
                return done(null, false);
            }

            return done(null, user);
        });

    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        if (err) {
            console.log("error in finding user");
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/users/signin");
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;