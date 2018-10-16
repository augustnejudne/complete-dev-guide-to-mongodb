const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

// we're doing this because Mocha doesn't work well with express
const Driver = mongoose.model('driver');


describe('Drivers controller', () => {
  beforeEach(done => {
    // console.log('========================');
    // console.log('mongoose.connection.collections');
    // console.log(mongoose.connection.collections);
    // console.log('========================');
    const { drivers } = mongoose.connection.collections;
    drivers.drop(() => done());
  });

  it('post to /api/drivers creates a new driver', done => {
    Driver.countDocuments().then(count => {
      assert(count === 0);
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
