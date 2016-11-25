var http = require('http');
var expect    = require("chai").expect;
var timestamp = require("../get_timestamp");
var constants = require("../constants");
var moment = require('moment');

describe("Check timestamp:", function() {

	var time   = "";
	var now ;
	var timenow ;

	before(function(done){
    	timestamp.getTimestamp(constants.TIMESTAMP_URL, function(data){
			time = data;
			now = moment();
			timenow = now.format('YYYY-MM-DD HH:mm Z');
			done();
		});
    });

	describe("Check timestamp length", function() {
		it("Time stamp length is 16", function() {
			expect(time.length).equal(16);
		});
	});

	describe("Check convertable timestamp", function() {
		it("Timestamp is convertable", function() {
			expect(moment(time/1000).isValid()).equal(true);
		});
	});

	describe("Check timestamp equal with timestamp of system", function() {
		it("Time stamp is equal with system", function() {
			expect(moment(time/1000).format('YYYY-MM-DD HH:mm Z')).equal(timenow);
		});
	});
});