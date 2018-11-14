var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var csrf = require('csurf');
var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/register', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/register', passport.authenticate('local.signup', {
    failureRedirect: '/users/register',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/usertype');
    }
});

router.get('/login', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.signin', {
    failureRedirect: '/users/login',
    failureFlash: true
}), function (req, res, next) {
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/usertype');
    }
});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}