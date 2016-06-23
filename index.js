var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var crypto = require('crypto');

urlMod = require('./models/url-mapping');
mongoose.connect('mongodb://localhost/url-shortener');
var db = mongoose.connection;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve the files
app.use(express.static('./public'));


app.get('/:_url', function(req, res) {				
		urlMod.getLongURL( req.params._url, function(err, response) {
		if(err) {
			throw err;
		}
		
		var resultURL = "http://";
		resultURL += response;
		res.redirect(resultURL);
	});	
		
});
	
app.post('/', function(req, res) {	
	var entryObj = req.body;		
	var limit = 7;		
	var urlLength = entryObj.longURL.length;
	var randomValueHex	= function(seed, limit) {
						    return crypto.randomBytes(Math.ceil(seed/2))
						        .toString('hex') // convert to hexadecimal format
						        .slice(0,limit);   // return required number of characters
							}
	var shortURL = randomValueHex(urlLength, limit);						
	
	urlMod.addURL(entryObj, shortURL, function(err, entryObj) {
		if(err) {
			throw err;
		}
		var slashedURL = "http://slash.ws/";
		slashedURL += shortURL;

		res.json(slashedURL);
	});
});


app.listen(3000);

console.log('server running on port 3000');

module.exports = app;