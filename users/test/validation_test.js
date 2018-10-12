const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  it('Requires a user name', (done) => {
    // I should receive an error message that says "Name is required"
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert (message === 'Name is required');
    done();
  })

  it('Requires a user name longer than 2 characters', (done) => {
    // I should receive an error message that says "Name must be longer than two characters"
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than two characters');
    done();
  });

  it('Disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch(err => {
        const { message } = err.errors.name;
        assert( message === 'Name must be longer than two characters');
        done();
      });
  });


});
