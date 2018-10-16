const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true });

app.use(express.json());

routes(app);

module.exports = app;