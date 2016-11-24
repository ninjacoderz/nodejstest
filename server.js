var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var moment = require('moment');

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
        
        var timezone = req.body.timezone;  
        if (-12 <= timezone && timezone <= 14) {
	    	console.log(timezone);
	        res.json({ message: moment().utcOffset(timezone*60).format('YYYY-MM-DD HH:mm') });
        }
        else {
        	res.json({ message: 'Your value is exceed ( range -12 -> 14 )' });
        }
        
    });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);