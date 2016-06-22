var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
	longURL: {
		type: String,
		required: true
	},
	shortURL: String,
	create_date: {
		type: Date,
		default: Date.now
	}
});

var urlMappings = module.exports = mongoose.model('urlMappings', urlSchema);

module.exports.getLongURL = function(queryParam, callback) {
	var queryObj = {};
	queryObj.shortURL = queryParam;
	var result = urlMappings.find(queryObj, {longURL:1, _id:0}, function(err, docs) {		
		if(err){
			callback(err, null);
		}
		else{
			if (docs[0]) {								
				callback(null, docs[0].longURL);
			}
		}
	});	
}

module.exports.addURL = function(entry, shortURL, callback) {	
	entry.shortURL = shortURL;
	urlMappings.create(entry, callback);
}
