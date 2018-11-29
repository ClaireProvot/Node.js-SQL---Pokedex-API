// Package dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const router = require('./routes/router');

// Express
const app = express();

//  Sets up the Express App
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.text());


// Run the routes
router(app, db);

// Launch DB
const initDB = () => {
  // Synchronize database with the previously declared models
  return db.sequelize.sync({
    alter: false,
  }).then((db) => {
    console.log('Database connected');
  }).catch(err => {
    console.log('Error connecting database:', err);
  });
};

// Start listening server
const startServer = () => {
  let server = app.listen(PORT, function () {
    console.log('App listening at port ', PORT);
  });
  return server;
};

// For unit tests, first launch DB then start server
const run = () => {
  return initDB().then(() => {
    return startServer();
  });
};

module.exports = run();