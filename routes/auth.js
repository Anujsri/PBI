const express = require('express');
const router = express.Router();
const googlepassport = require('passport');

router.get('/google', googlepassport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback/',
  googlepassport.authenticate('google', { failureRedirect: '/user/login/' }),(req, res) => {
    res.redirect('/usertype');
  });

//router.get('/facebook', passport.authenticate('facebook', {scope: 'email' }));

/*router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),(req, res) => {
    res.redirect('/');
  });*/

 
module.exports = router;