var chai = require('chai');
chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../models/user')
module.exports = require('./');
const assert = require('assert');
require('dotenv').config()
const PORT = process.env.PORT
var storedToken = 'null';
let server = `http://localhost:${process.env.PORT}`
describe('/GET users', () => 
{
    it('It should return the users array.', (done) => 
    {
      chai.request(server).get('/api/users/').end((err, res) => 
      {
        chai.expect(res).to.have.property('body');
        chai.expect(res.body[0]).to.have.property('_id');
        chai.expect(res.body[0]).to.have.property('username');
        chai.expect(res.body[0]).to.have.property('email');
        done();
      });
    });
});

describe('login', () =>
{
    it('It should try to login, returning error due to invalid credentials', (done) =>
    {
        chai.request(server).get('/api/login/').end((err, res)=>
        {
            chai.expect(res).to.have.property('error');
            done();
        });
    });
});

describe('/POST Create User', () => 
{
    it('Create User Testing, if exists, will give E11000 duplicate error', (done) => 
    {
        let user = {
            "username": "mochatest",
            "fullname": "mocha_test",
            "phonenumber": "215125125612",
            "email": "mochatest@gmail.com",
            "password": "mochatest"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                done();
            
        });
    });
})
describe('/GET car category postings', () => 
{
    it('It should return all car postings.', (done) => 
    {
      chai.request(server).get('/api/postings/category/cars/').end((err, res) => 
      {
        chai.expect(res).to.have.property('body');
        chai.expect(res.body[0]).to.have.property('_id');
        chai.expect(res.body[0]).to.have.property('title');
        chai.expect(res.body[0]).to.have.property('description');
        chai.expect(res.body[0]).to.have.property('category');
        chai.expect(res.body[0]).to.have.property('location');
        chai.expect(res.body[0]).to.have.property('price');
        chai.expect(res.body[0]).to.have.property('userReference');

        done();
      });
    });
});
describe('/GET postings by date', () => 
{
    it('It should return all posts from the specified date.', (done) => 
    {
      chai.request(server).get('/api/postings/date/2022-02-18').end((err, res) => 
      {
        chai.expect(res).to.have.property('body');
        chai.expect(res.body[0]).to.have.property('_id');
        chai.expect(res.body[0]).to.have.property('title');
        chai.expect(res.body[0]).to.have.property('description');
        chai.expect(res.body[0]).to.have.property('category');
        chai.expect(res.body[0]).to.have.property('location');
        chai.expect(res.body[0]).to.have.property('price');
        chai.expect(res.body[0]).to.have.property('userReference');

        done();
      });
    });
});
describe('/GET postings by location', () => 
{
    it('It should return all postings from the specified location postings.', (done) => 
    {
      chai.request(server).get('/api/postings/location/oulu').end((err, res) => 
      {
        chai.expect(res).to.have.property('body');
        chai.expect(res.body[0]).to.have.property('_id');
        chai.expect(res.body[0]).to.have.property('title');
        chai.expect(res.body[0]).to.have.property('description');
        chai.expect(res.body[0]).to.have.property('category');
        chai.expect(res.body[0]).to.have.property('location');
        chai.expect(res.body[0]).to.have.property('price');
        chai.expect(res.body[0]).to.have.property('userReference');

        done();
      });
    });
});
describe('POST login', () => 
{
    it('It should try to login and return 200 status.', (done) => 
    {
      let user = {
        "username": "mochatest",
        "email": "mochatest@gmail.com",
        "password": "mochatest"
      }
      chai.request(server).post('/api/login')
      .send(user)
      .end((err, res) => 
      {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('username');
        storedToken = res.body.token;
        done();
      });
    });
});

describe('POST listings', () => 
{
    let listing = {
      "title": "Test",
      "description": "Test1",
      "category": "Test2CategoryMOCHA",
      "location": "Test3",
      "price": 200,
      "deliverytype": "shipping",
    }
    it('It should try to post listing with stored token and succeed.', (done) => 
    {
      chai.request(server).post('/api/postings')
      .auth(storedToken, { type: 'bearer' })
      .send(listing)
      .end((err, res) => 
      {
        expect(storedToken).not.to.be.null;
        expect(err).to.be.null;
        expect(res).to.not.have.status(401);
        done();
      });
    });
});

describe('GET listings', () => 
{
    it('It should return the listings array.', (done) => 
    {
      chai.request(server).get('/api/postings').end((err, res) => 
      {
        expect(err).to.be.null;
        expect(res).to.have.property('body');
        done();
      });
    });
});