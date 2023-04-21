const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const user_controller = require("../controllers/user_controller")

router.get("/profile/:id", passport.checkAuthentication, user_controller.users)
router.post('/update/:id', passport.checkAuthentication, user_controller.update)
router.get('/signup', user_controller.signup)
router.get('/signin', user_controller.signin)
router.post('/create', user_controller.create)
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: "/users/signin" }
), user_controller.createSession)
router.get('/sign-out', user_controller.destroySessin)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/signin' }), user_controller.createSession)

module.exports = router;