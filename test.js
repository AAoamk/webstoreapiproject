var chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const User = require('../models/user')
module.exports = require('./');
const assert = require('assert');
const { model } = require('mongoose');

describe('/GET users', () => 
{
    it('It should return the users array.', (done) => 
    {
      chai.request('http://localhost:80').get('/api/users/').end((err, res) => 
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
        chai.request('http://localhost:80').get('/api/login/').end((err, res)=>
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
        chai.request('http://localhost:80')
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                done();
            
        });
    });
})
