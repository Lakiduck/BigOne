//Establish Routes

//Load User Model to be used in post requests
const user = require('./models/user');

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
    console.log(req.body);
    if(req.body.password === req.body.confirm){
      User(req.body).save(function(err, data){
        if(err){
          throw err;
        } else {
        res.send('Success');
        }
      });
    } else {
        res.send('Password\'s didn\'t match');
    }
  });

  app.post('/login', urlencodedParser, auth.passport.authenticate('local', {
      failureRedirect: '/login'
    }),
    function(req, res){
      res.send('Authenticated');
    });

  app.get('/home', auth.loggedin, function(req, res){
      res.send("Home");
  });
};
