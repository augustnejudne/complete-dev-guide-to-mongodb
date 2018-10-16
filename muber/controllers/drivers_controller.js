const Driver = require('../models/driver_model');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there!', hello: 'world!' });
  },

  create(req, res) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch((err) => {
        res.send(`<h1>${err.errors.email.message}</h1>`);
      });
  }
};
