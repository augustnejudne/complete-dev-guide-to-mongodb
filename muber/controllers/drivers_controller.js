const Driver = require('../models/driver_model');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there!', hello: 'world!' });
  },

  index(req, res, next) {
    // Driver.find({}).then(drivers => res.send(drivers));
    const { lng, lat } = req.query;

    Driver.find({
      // this geometry is indexed for the test in drivers_controller_test line 24
      geometry: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: 100000
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next);

    // Driver.aggregate([
    //   {
    //     $geoNear: {
    //       near: {
    //         type: 'Point',
    //         coordinates: [parseFloat(lng), parseFloat(lat)]
    //       },
    //       distanceField: 'dist.calculated',
    //       maxDistance: 400000,
    //       spherical: true
    //     }
    //   }
    // ])
    //   .then(drivers => {
    //     res.send(drivers);
    //   })
    //   .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findOneAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
