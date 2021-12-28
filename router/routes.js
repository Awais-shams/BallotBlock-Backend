var express = require('express');
var router = express.Router();

// import controllers
const adminController = require('../controllers/adminController');
const organizerController = require('../controllers/organizerController');
const designationController = require('../controllers/designationController');
const candidateController = require('../controllers/candidateController');
const voterController = require('../controllers/voterController');

// // routes - ADMIN
router.get('/admin/', adminController.index);
router.post('/admin/create', adminController.create);
router.patch('/admin/edit', adminController.edit);
router.get('/admin/:uuid', adminController.show);
router.delete('/admin/:uuid', adminController.delete);

// routes - ORGANIZER
router.get('/organizer/', organizerController.index);
router.post('/organizer/create', organizerController.create);
router.patch('/organizer/edit', organizerController.edit);
router.get('/organizer/:uuid', organizerController.show);
router.delete('/organizer/:uuid', organizerController.delete);

// routes - DESIGNATION
router.get('/designation/', designationController.index);
router.post('/designation/create', designationController.create);
router.patch('/designation/edit', designationController.edit);
router.get('/designation/:uuid', designationController.show);
router.delete('/designation/:uuid', designationController.delete);

// // routes - CANDIDATE
router.get('/candidate/', candidateController.index);
router.post('/candidate/create', candidateController.create);
router.patch('/candidate/edit', candidateController.edit);
router.get('/candidate/:uuid', candidateController.show);
router.delete('/candidate/:uuid', candidateController.delete);

// routes - CANDIDATE
router.get('/voter/', voterController.index);
router.post('/voter/create', voterController.create);
router.patch('/voter/edit', voterController.edit);
router.get('/voter/:uuid', voterController.show);
router.delete('/voter/:uuid', voterController.delete);

module.exports = router;