/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var globalVal = require('./config/gloval_value');
var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/api/globalValues',
    router.get('/', function(req, res) {
      res.json(globalVal);
    })
  );
  // Insert routes below
  app.use('/api/surveys', require('./api/survey'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
