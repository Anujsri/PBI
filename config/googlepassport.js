var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./database');
// Load user model
var User = require('../models/user');

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  User.getUserById(id, (err, user)=> {
    done(err, user);
  });
});


module.exports = function(googlepassport){
  googlepassport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret:keys.googleClientSecret,
      callbackURL:'/auth/google/callback/',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);
      const newUser = {
        name: profile.name.givenName,
        email: profile.emails[0].value
      }

      // Check for existing user
      User.findOne({email: profile.emails[0].value}).exec((err,user) => {
        if(user){
          // Return user

          done(null, user);
        } else {
          // Create user

            User.create({ name: profile.name.givenName, email: profile.emails[0].value }, function (err, user) {
                 
                return done(null,user);
                // saved!
            });
        }
      });
    })
  );

  
}



 

