var express = require('express');
var api = express.Router();

// import controllers
const apiController = require('../controllers/apiController');

// All resources
api.get("/test/:key", apiController.test);
api.get("/elections/:key", apiController.elections);
api.get("/organizations/:key", apiController.organizations);

// Filtered Resources
api.get("/audit/:key/:electionId", apiController.audit);
api.get("/candidates/:key/:electionId", apiController.candidates);

module.exports = api;