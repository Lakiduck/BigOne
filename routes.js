//Establish Routes

//Load User Model to be used in post requests
const user = require('./models/user');

const UserModel = user.user;

module.exports = function(app, urlencodedParser) {

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/createaccount', function(req, res){
    res.render('createaccount')
  });

  app.post('/createaccount', urlencodedParser, function(req, res){
    console.log(req.body);
    if(req.body.password === req.body.confirm){
      UserModel(req.body).save(function(err, data){
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

  app.post('/login', urlencodedParser, function(req, res){
    //code here
  });

}
