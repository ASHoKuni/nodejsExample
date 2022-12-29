process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Roles = require('../../model/role');


//Require the dev-dependencies
const chai = require('chai');
const  chaiHttp = require('chai-http');
const api = require('../../index');
const should = chai.should();


chai.use(chaiHttp);

const defaultUser = {
    "email":"ashokdhokare9@gmail.com",
    "password":"admin"
}

let token;
let id = "1c943a29-6bca-45d9-b8f5-b3efe61687ea"

describe('Roles API',() =>{
    /**
     * Test the login  route
     */
    beforeEach(done =>{
        chai.request(api).post('/api/login').send(defaultUser).end((err,res) =>{
            token = res.body.data.token;
            res.should.have.status(200);
        done();
        })
    })
    /**
     * Test the GET all role route
     */
    describe('GET /api/getRoles', () => {
        it('it should get all the roles',(done) =>{
            chai.request(api).get('/api/getRoles').set({ "Authorization": `Bearer ${token}` })
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('pagination');
                res.body.should.have.property('data');

              done();
            });

        });
        // it("It should NOT GET all the tasks", (done) => {
        //     chai.request(api).get('/api/getRoles').set({ "Authorization": `Bearer ${token}` })
        //     .end((err, response) => {
        //         response.should.have.status(404);
        //         done();
        //         });
        // });
    })
    /**
     * Test the GET (by id) route
     */
    describe('POST /api/getRoleById/:id',() =>{
        it('get role by id ',(done) =>{
            chai.request(api).post('/api/getRoleById/'+ id).set({ "Authorization": `Bearer ${token}` })
            .end((err,res) => {
                res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('id');
                // res.body.should.have.property('roleName');
                // res.body.should.have.property('data');

              done();
            })
        })

    })
})
