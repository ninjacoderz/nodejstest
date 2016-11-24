var http = require('http');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
exports.getTimestamp = function(url, callback){
	var data = "";
	var timestamp = "";
	http.get(url, function(res) {
	 	if (res.statusCode >= 200 && res.statusCode < 400) {
		   	res.on('data', function(data_) { data += data_.toString(); });
		   	res.on('end', function() {
		     	parser.parseString(data, function(err, result) {
					timestamp = result.timestamp.$.time; 
					callback(timestamp);
	     		});
	   		});
		}
	});
	
};