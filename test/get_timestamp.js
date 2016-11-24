var http = require('http');
var expect    = require("chai").expect;
var timestamp = require("../get_timestamp");
var constants = require("../constants");
var moment = require('moment');

describe("Check timestamp:", function() {
	describe("Check timestamp length", function() {
		var time = "";
	    before(function(done){
	    	timestamp.getTimestamp(constants.TIMESTAMP_URL, function(data){
				time = data;
				done();
			});
	    });

		it("Time stamp length is 16", function() {
			expect(time.length).equal(16);
		});
	});

	describe("Check convertable timestamp", function() {
		it("Time stamp is convertable", function() {
			var time   = "";
			before(function(done){
		    	timestamp.getTimestamp(constants.TIMESTAMP_URL, function(data){
					time = data;
					done();
				});
		    });

			it("Time stamp length is 16", function() {
				expect(moment(time/1000).isValid()).equal(true);
			});
			
		});
	});
});