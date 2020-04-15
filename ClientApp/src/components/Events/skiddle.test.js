var chai = require("chai");
var chaiHttp = require("chai-http")
chai.should();
chai.use(chaiHttp);

const should = require('should');

describe('Skiddle API Test ',()=> 
{
    it('it should return response status ok 200', (done) => {
    chai.request('http://www.skiddle.com/api/v1')
    .get('/events/search/?api_key=1981a0231405eeba6bbbdd38829c8501&latitude=53.383331&longitude= -1.466667&limit=30&radius=10&eventcode=CLUB&order=date&description=1')
    .end((err,response) => {

        should(response.status).equal(200);

        done();
});
});
});

describe('Wrong Skiddle API key',()=> 
{
    it('it should return response status 400', (done) => {
    chai.request('http://www.skiddle.com/api/v1')
    .get('/events/search/?api_key=1981a0231405eeba6bbbd01&latitude=53.383331&longitude= -1.466667&limit=30&radius=10&eventcode=CLUB&order=date&description=1')
    .end((err,response) => {

        should(response.status).equal(400);

        done();
});
});
});


describe('Wrong Url',()=> 
{
    it('it should return response status 404', (done) => {
    chai.request('http://www.skiddle.com/api')
    .get('/events/search/?api_key=1981a0231405eeba6bbbd01&latitude=53.383331&longitude= -1.466667&limit=30&radius=10&eventcode=CLUB&order=date&description=1')
    .end((err,response) => {

        should(response.status).equal(404);

        done();
});
});
});
