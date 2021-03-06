//Establish Routes

//Load User Model to be used in post requests
const user = require('./models/user');
const hash = require('./hash');

const User = user.user;

module.exports = function(app, urlencodedParser, auth) {

  app.get('/login', function(req, res){
    if(req.user){
        res.send("Authenticated");
    } else{
      res.render('login');
    }
  });

  app.get('/createaccount', function(req, res){
    if(req.user){
      res.send('Authenticated');
    } else{
      res.render('createaccount');
    }
  });

  app.post('/createaccount', urlencodedParser, function(req, res){

    User.findOne({email: req.body.email}, function(err, user){
      if(user){
        //res.send('User already exists');
        res.render('userexists', {prompt: "User already exists"})
      } else if(req.body.password === req.body.confirm){
        const hp = hash.saltHashPassword(req.body.password);

        req.body.hashedPassword = hp.hashedPassword;
        req.body.salt = hp.salt;
        delete req.body.password;
        delete req.body.confirm;
        
        User(req.body).save(function(err, data){
          if(err){
            throw err;
          } else {
            res.render('accountcreated', {name: req.body.name});
          }
        });
      } else {
        //res.send('Password\'s didn\'t match');
        res.render('passwordnomatch', {prompt: "Passwords do not match"})
      }
    });
  });

  app.post('/login', urlencodedParser, auth.passport.authenticate('local', {
      failureRedirect: '/incorrectpassword'
    }),
    function(req, res){
      res.redirect('chat');
    });

    app.get('/incorrectpassword', function(req, res){
      res.render('incorrectpassword', {prompt: "Incorrect Username or Password"})
    });

  app.get('/', auth.loggedin, function(req, res){
      res.redirect("chat");
  });

  app.get('/chat', auth.loggedin, function(req, res){
    res.render('chat');
  });
};
