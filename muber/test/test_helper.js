const mongoose = require('mongoose');

// for our tests, we connect to the muber_test database
before(done => {
  mongoose.connect(
    'mongodb://localhost/muber_test',
    { useNewUrlParser: true }
  );
  mongoose.connection.once('open', () => done()).on('error', err => {
    console.warn('Warning', err);
  });
});

