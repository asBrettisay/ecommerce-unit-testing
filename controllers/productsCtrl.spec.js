const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;
const Product = require('../models/Product');


chai.use(chaiHttp);

const testingVariable = true;

// describe('productsCtrl', function() {
//   it('should know that true is true', function() {
//     chai.expect(testingVariable).not.to.equal(false);
//     chai.expect(2).to.equal(2);
//   })
//
//   it('should be able to identify a number', function() {
//     chai.expect(typeof 2).to.equal('number');
//   })
// })
//

describe('productsCtrl', function() {

  beforeEach(function(done) {
    Product.remove({}, function(err, res) {
      if (err) throw err;
      Product.create({
        name: 'testBike',
        price: 'testPrice',
        description: 'testDescription'
      }, function(err, res) {
        if (err) throw err;
        done();
      })
    });
  })

  describe('index', function() {
    it('should get all products', function(done) {
      chai.request(app)
        .get('/products')
        .end(function(err, res) {

          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          let product = res.body[0];

          expect(product).to.have.property('name');
          expect(product).to.have.property('price');
          expect(product).to.have.property('description');

          done();
        })
    })

    it('should get one product', function(done) {
      Product.create({
        name: 'testCar',
        price: 'testPrice',
        description: 'testDescription'
      }, function(err, res) {
        if (err) throw err;

        expect(res).to.be.an('object');
        expect(res._id).to.be.ok;

        chai.request(app)
          .get('/products/' + res._id)
          .end(function(err, res) {
            if (err) throw err;

            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.an('array');
            expect(res.body).to.be.an('object');

            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('price');
            expect(res.body).to.have.property('description');

            done();
          })
      })

    })
  })

  describe('create', function() {
    it('should add a product to the database', function(done) {
      chai.request(app)
        .post('/products')
        .send({
          name: 'testBall',
          price: 'testPrice',
          description: 'testDescription'
        })
        .end(function(err, res) {
          if (err) throw err;

          expect(res.status).to.equal(200);

          Product.findOne({name: 'testBall'}, function(err, ball) {
            if (err) throw err;
            expect(ball).to.be.ok;
            expect(ball._id).to.be.ok;

            done();
          })
        })
    })
  })

  describe('update', function() {
    it('should update a document', function(done) {
      Product.create({
        name: 'testName',
        price: 'testPrice',
        description: 'testDescription'
      }, function(err, res) {
        if (err) throw err;

        chai.request(app)
          .put('/products/' + res._id)
          .send({name: 'testAirPlane'})
          .end(function(err, res) {
            if (err) throw err;

            expect(res.status).to.equal(200);

            Product.findOne({name: 'testAirPlane'}, function(err, res) {
              if (err) throw err;

              expect(res).to.be.an('object');
              expect(res.name).to.be.a('string');
              expect(res.name).to.equal('testAirPlane');
              done();
            })
          })
      })
    })
  })
})
