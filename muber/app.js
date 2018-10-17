const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// we're using two separte databases
// one for development, one for production
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    'mongodb://localhost/muber',
    { useNewUrlParser: true }
  );
}

app.use(express.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  next();
});

module.exports = app;
