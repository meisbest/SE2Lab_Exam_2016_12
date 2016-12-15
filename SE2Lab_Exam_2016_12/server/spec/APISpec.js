//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showList
describe("Test /showList", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showList/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchStudent
describe("Test /searchStudent", function() {
	//set the data
	var data = {ID: '1'};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "searchStudent/", data, function(err, res, body) {
		expect(body).toEqual(
			{
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			}
		);

		done();
	  });
	});
	
	//student non existing
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	data2 = {name: "1" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});


});

// Test for /deleteStudent
describe("Test /deleteStudent", function() {
	//set the data
	var goodDataID = {ID: '1'};
	var goodDataSSN = {SSN: 'AB45'};
	var badDataID = {ID: '10'};
	var badDataSSN = {SSN: 'ciao'};
	var badParameter = {param: 'no'};
	
	//legal request for ID
	it("to returns status code 200", function(done) {
		client.post(base_url + "deleteStudent/", goodDataID, function(err, res, body) {
			expect(body).toEqual(
			{
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			});
			done();
		});
	});
	
	//legal request for SSN
	it("to returns status code 200", function(done) {
		client.post(base_url + "deleteStudent/", goodDataSSN, function(err, res, body) {
			expect(body).toEqual(
			{
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			});
			done();
		});
	});
	
	//unexisting ID
	it("to returns status code 404", function(done) {
		client.post(base_url + "deleteStudent/", badDataID, function(err, res, body) {
			expect(res.statusCode).toBe(404);
			done();
		});
	});
	
	//unexisting SSN
	it("to returns status code 404", function(done) {
		client.post(base_url + "deleteStudent/", badDataSSN, function(err, res, body) {
			expect(res.statusCode).toBe(404);
			done();
		});
	});
	
	//wrong parameter
	it("to returns status code 406", function(done) {
	  client.post(base_url + "deleteStudent/", badParameter, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});
});
