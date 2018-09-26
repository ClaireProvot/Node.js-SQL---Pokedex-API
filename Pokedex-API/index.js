// Package dependencies
import express from 'express';
import bodyParser from 'body-parser';
import db from './models';
import router from './routes/router';

// Express
const app = express();

//  Sets up the Express App
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Run the routes
router(app, db);

// Starts the server to begin listening
db.sequelize.sync().then(function () {
      app.listen(PORT, function() {
            console.log(`Listening on PORT ${PORT}`);
      });
});
