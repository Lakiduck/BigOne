//Serve web application using express
const express = require('express');
const bodyParser = require('body-parser');
//Load Custom Routes
const routes = require('./routes');

const app = express();

//Set template engine to be used
app.set('view engine', 'ejs');

//Serve static files
app.use(express.static('public'));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Pass app into routes.js
routes(app, urlencodedParser);

//listen to any requests on port 3000
app.listen(3000);
console.log("Listening to port 3000")
