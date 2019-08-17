module.exports = function(app){

  //Session Counter Test
  app.get('/views', function(req, res, next){
    if(req.session.views){
      req.session.views = req.session.views + 1;
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + req.session.views + '</p>');
      res.write('<p>session expiry: ' + req.session.cookie.expires + '</p>');
      res.end()
    } else {
      req.session.cookie.maxAge = 600000;
      req.session.views = 1
      res.end("First View");
    }
  });

  //testing accountcreatedlayout
  app.get('/congratulations', function(req, res){
      res.render('accountcreated');
  });
};
