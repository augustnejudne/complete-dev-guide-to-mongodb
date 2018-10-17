const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../../app');

chai.use(chaiHttp);

// we're doing this because Mocha doesn't work well with express
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  beforeEach(done => {
    // console.log('========================');
    // console.log('mongoose.connection.collections');
    // console.log(mongoose.connection.collections);
    // console.log('========================');
    const { drivers } = mongoose.connection.collections;
    drivers
      .drop()
      // i create an index on the geometry object!!!
      // this geometry object is referenced in the Driver.find method in driver.controller.js line 12
      // .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
      .then(() => drivers.createIndex({ geometry: '2dsphere' }))
      .then(() => done())
      .catch(() => done());
  });

  it('POST to /api/drivers creates a new driver', done => {
    Driver.countDocuments().then(count => {
      assert.equal(count, 0);
      chai
        .request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.countDocuments().then(newCount => {
            assert.equal(count + 1, newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/:id edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver
      .save()
      .then(() => {
        chai
          .request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end(() => {
            Driver.findOne({ email: 't@t.com' }).then(d => {
              assert(d.driving === true);
            });
          });
      })
      .then(() => done());
  });

  it('DELETE request to /api/drivers/:id removes an existing user', done => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save().then(() => {
      Driver.findOne({ email: 'test@test.com' })
        .then(driver => assert(driver !== null))
        .then(() => {
          chai
            .request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end(() => {
              Driver.findOne({ email: 'test@test.com' }).then(driver => {
                assert(driver === null);
                done();
              });
            });
        });
    });
  });

  it.only('GET request to /api/drivers finds drivers in a location', done => {
    const dumaDriver = new Driver({
      email: 'dumaDriver@test.com',
      driving: false,
      geometry: { type: 'Point', coordinates: [120, 20] }
    });

    const manilaDriver = new Driver({
      email: 'manilaDriver@test.com',
      driving: false,
      geometry: { type: 'Point', coordinates: [120.9822, 14.6042] }
    });

    Promise.all([dumaDriver.save(), manilaDriver.save()]).then(() => {
      chai
        .request(app)
        .get('/api/drivers/?lng=120&lat=20')
        .end((err, response) => {
          // console.log(response.body.error);
          console.log(response.body);

          assert(response.body[0].email === dumaDriver.email);
          done();
        });
    });
  });
});
