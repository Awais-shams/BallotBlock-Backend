var express = require('express');
var router = express.Router();

// import authentication middleware
const {validateToken} = require('../authentication/JWT');


// import controllers
const adminController = require('../controllers/adminController');
const organizerController = require('../controllers/organizerController');
const designationController = require('../controllers/designationController');
const candidateController = require('../controllers/candidateController');
const voterController = require('../controllers/voterController');
const authController = require('../controllers/authController');

// // routes - ADMIN
router.get('/admin/', validateToken, adminController.index);
router.post('/admin/create', adminController.create);
router.patch('/admin/edit', validateToken, adminController.edit);
router.get('/admin/:uuid', validateToken, adminController.show);
router.delete('/admin/:uuid', validateToken, adminController.delete);

// routes - ORGANIZER
router.get('/organizer/', validateToken, organizerController.index);
router.post('/organizer/create', organizerController.create);
router.patch('/organizer/edit', validateToken, organizerController.edit);
router.get('/organizer/:uuid', validateToken, organizerController.show);
router.delete('/organizer/:uuid', validateToken, organizerController.delete);

// routes - DESIGNATION
router.get('/designation/', validateToken, designationController.index);
router.post('/designation/create', validateToken, designationController.create);
router.patch('/designation/edit', validateToken, designationController.edit);
router.get('/designation/:uuid', validateToken, designationController.show);
router.delete('/designation/:uuid', validateToken, designationController.delete);

// // routes - CANDIDATE
router.get('/candidate/', validateToken, candidateController.index);
router.post('/candidate/create', validateToken, candidateController.create);
router.patch('/candidate/edit', validateToken, candidateController.edit);
router.get('/candidate/:uuid', validateToken, candidateController.show);
router.delete('/candidate/:uuid', validateToken, candidateController.delete);

// routes - VOTER
router.get('/voter/', validateToken, voterController.index);
router.post('/voter/create', voterController.create);
router.patch('/voter/edit', validateToken, voterController.edit);
router.get('/voter/:uuid', validateToken, voterController.show);
router.delete('/voter/:uuid', validateToken, voterController.delete);

// router - AUTH
router.post('/auth/admin', authController.adminAuth);
router.post('/auth/organizer', authController.oganizerAuth);
router.post('/auth/candidate', authController.candidateAuth);
router.post('/auth/voter', authController.voterAuth);

module.exports = router;