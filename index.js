//Serve web application using express
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//Load Custom Routes
const routes = require('./routes');
const tests = require('./tests');
const user = require('./models/user');
const auth = require('./auth');


const app = express();

//Set template engine to be used
app.set('view engine', 'ejs');

//Serve static files
app.use(express.static('public'));

//Configure Session Option
app.use(session({
  secret: 'secret',
  store: new MongoStore({mongooseConnection: user.connection}),
  resave: false,
  saveUninitialized: false,
  rolling: false,
  cookie: {secure: 'auto', maxAge: 60000}
}));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Pass app into auth.js
auth.app(app);

//Pass app into routes.js
routes(app, urlencodedParser, auth);

//pass app into tests.js
tests(app);

//listen to any requests on port 3000
app.listen(3000);
console.log("Listening to port 3000")
