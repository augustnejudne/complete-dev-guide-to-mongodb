const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../app');

chai.use(chaiHttp);

describe('The express app', () => {
  it('handles a GET request to /api', done => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        // assert(res.body.hi === 'there!');
        // assert(res.body.hello === 'world!');
        assert.equal(res.body.hi, 'there!');
        assert.equal(res.body.hello, 'world!');
        done();
      });
  });
});
