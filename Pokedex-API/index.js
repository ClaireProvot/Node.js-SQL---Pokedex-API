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
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(bodyParser.text());


// Run the routes
router(app, db);

// Synchronize database with the previously declared models
db.sequelize.sync({
  alter: false
}).then((db) => {
  console.log('Database connected');
}).catch(err => {
  console.log('Error connecting database:', err);
});
    
// Start listening to external http requests
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;