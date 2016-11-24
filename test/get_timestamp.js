var http = require('http');
var expect    = require("chai").expect;
var server = require("../server");

describe("Time stamp is ready", function() {
	it("Time stamp is ready", function() {
		var timestamp   = server.getTimeStamp();
		
	 	expect(timestamp.length==16);
	 });
});