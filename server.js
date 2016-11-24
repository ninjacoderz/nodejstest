var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var moment = require('moment');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var constants = require('./constants');
var timestamp = require('./get_timestamp');

parser.on('error', function(err) { console.log('Parser error', err); });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var router = express.Router(); 

router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/get_curent_time')

    .post(function(req, res) {
        
        var data = '';
        
        timestamp.getTimestamp(constants.TIMESTAMP_URL, function(data){
        	var timezone = req.body.timezone;  
			if (-12 <= timezone && timezone <= 14) {
				res.json({ message: moment(data/1000).utcOffset(timezone*60).format('YYYY-MM-DD HH:mm') });
			}
			else {
				res.json({ message: 'Your value is exceed ( range -12 -> 14 )' });
			}
        });
        
    });

app.use('/api', router);

app.listen(port);
