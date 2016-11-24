var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var moment = require('moment');
var http = require('http');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();
parser.on('error', function(err) { console.log('Parser error', err); });



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var router = express.Router(); 

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/get_curent_time')

    .post(function(req, res) {
        
        var data = '';
		http.get('http://www.time.gov/actualtime.cgi', function(ares) {
		 if (ares.statusCode >= 200 && ares.statusCode < 400) {
		   ares.on('data', function(data_) { data += data_.toString(); });
		   ares.on('end', function() {
		     console.log('data', data);
		     parser.parseString(data, function(err, result) {
				console.log('FINISHED', err, result);
				console.log(result.timestamp.$.time);
				var timezone = req.body.timezone;  
				if (-12 <= timezone && timezone <= 14) {
					console.log(timezone);
					res.json({ message: moment(result.timestamp.$.time/1000).utcOffset(timezone*60).format('YYYY-MM-DD HH:mm') });
				}
				else {
					res.json({ message: 'Your value is exceed ( range -12 -> 14 )' });
				}
		     });
		   });
		 }
		});

        
        
    });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

exports.getTimeStamp = function(){
	var data = '';
	var timestamp = "";
	http.get('http://www.time.gov/actualtime.cgi', function(res) {
	 	if (ares.statusCode >= 200 && ares.statusCode < 400) {
		   	res.on('data', function(data_) { data += data_.toString(); });
		   	res.on('end', function() {
		     
		     	parser.parseString(data, function(err, result) {
					timestamp = result.timestamp.$.time; 

	     		});
	   		});
		}
	});
	return timestamp;
}