const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user').user;

module.exports.app = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

};

passport.serializeUser(function(user, done){
done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false);
      }
      if(user.password !== password){
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

module.exports.passport = passport;

module.exports.loggedin = function(req, res, next){
  if(req.user){
    next();
  } else{
    res.redirect('login');
  }
};
