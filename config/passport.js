var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

var User = require("../models/userModel.js");

var configAuth = require("./auth.js");

module.exports = function(passport){
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebook-auth.clientID,
    clientSecret: configAuth.facebook-auth.clientSecret,
    callbackURL: configAuth.facebook-auth.callbackURL,
  },
  function(accessToken, refreshToken, profile, cb){
    return cb(null, profile);
  }));
};
