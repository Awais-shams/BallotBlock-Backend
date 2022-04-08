var express = require('express');
var router = express.Router();

// import authentication middleware
const {validateToken} = require('../authentication/JWT');

// import roles
const Role = require('../authentication/roles');

// import controllers
const adminController = require('../controllers/adminController');
const organizerController = require('../controllers/organizerController');
const designationController = require('../controllers/designationController');
const candidateController = require('../controllers/candidateController');
const voterController = require('../controllers/voterController');
const authController = require('../controllers/authController');

// // routes - ADMIN
router.get('/admin/', validateToken([Role.Admin]), adminController.index);
router.post('/admin/create', adminController.create);
router.patch('/admin/edit', validateToken([Role.Admin]), adminController.edit);
router.get('/admin/:uuid', validateToken([Role.Admin]), adminController.show);
router.delete('/admin/:uuid', validateToken([Role.Admin]), adminController.delete);

// routes - ORGANIZER
router.get('/organizer/', validateToken([Role.Admin]), organizerController.index);
router.post('/organizer/create', validateToken([Role.Admin]), organizerController.create);
router.patch('/organizer/edit', validateToken([Role.Admin, Role.Organizer]), organizerController.edit);
router.get('/organizer/:uuid', validateToken([Role.Admin, Role.Organizer]), organizerController.show);
router.delete('/organizer/:uuid', validateToken([Role.Admin]), organizerController.delete);

// routes - DESIGNATION
router.get('/designation/', validateToken([Role.Organizer]), designationController.index);
router.post('/designation/create', validateToken([Role.Organizer]), designationController.create);
router.patch('/designation/edit', validateToken([Role.Organizer]), designationController.edit);
router.get('/designation/:uuid', validateToken([Role.Organizer]), designationController.show);
router.delete('/designation/:uuid', validateToken([Role.Organizer]), designationController.delete);

// // routes - CANDIDATE
router.get('/candidate/', validateToken([Role.Organizer]), candidateController.index);
router.post('/candidate/create', validateToken([Role.Organizer]), candidateController.create);
router.patch('/candidate/edit', validateToken([Role.Organizer, Role.Candidate]), candidateController.edit);
router.get('/candidate/:uuid', validateToken([Role.Organizer, Role.Candidate]), candidateController.show);
router.delete('/candidate/:uuid', validateToken, candidateController.delete);

// routes - VOTER
router.get('/voter/', validateToken([Role.Organizer]), voterController.index);
router.post('/voter/create', voterController.create);
router.patch('/voter/edit', validateToken([Role.Voter]), voterController.edit);
router.get('/voter/:uuid', validateToken([Role.Voter]), voterController.show);
router.delete('/voter/:uuid', validateToken([Role.Voter]), voterController.delete);

// router - AUTH
router.post('/auth/admin', authController.adminAuth);
router.post('/auth/organizer', authController.oganizerAuth);
router.post('/auth/candidate', authController.candidateAuth);
router.post('/auth/voter', authController.voterAuth);
// logout route
router.get('/auth/logout', authController.logout);

module.exports = router;