// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var hbs = require('hbs');

app.set('view engine', 'html');
app.engine('html', hbs.__express);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

app.use(express.static('public'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/', router);

app.get('/', function(req, res) {
    res.render('index');
});
 
app.get('/about', function(req, res) {
    res.render('about');
});
 
app.get('/contact', function(req, res) {
    res.render('contact');
});

// START THE SERVER
// =============================================================================
app.listen(port);