var express = require('express');
var router = express.Router();

// import authentication middleware
const {validateToken} = require('../authentication/JWT');

// import roles
const Role = require('../authentication/roles');

// import controllers
const adminController = require('../controllers/adminController');
const organizerController = require('../controllers/organizerController');
const candidateController = require('../controllers/candidateController');
const voterController = require('../controllers/voterController');
const organizationController = require('../controllers/organizationController');
const electionController = require('../controllers/electionController');
const outletController = require('../controllers/outletController');
const voteController = require('../controllers/voteController');
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

// routes - ORGANIZATION
router.get('/organization/', validateToken([Role.Organizer]), organizationController.index);
router.post('/organization/create', validateToken([Role.Organizer]), organizationController.create);
router.patch('/organization/edit', validateToken([Role.Organizer]), organizationController.edit);
router.get('/organization/:uuid', validateToken([Role.Organizer]), organizationController.show);
router.delete('/organization/:uuid', validateToken([Role.Organizer]), organizationController.delete);

// routes - ELECTION
router.get('/election/', validateToken([Role.Organizer, Role.Admin, Role.Voter]), electionController.index);
router.get('/election/filtered/:uuid', validateToken([Role.Organizer, Role.Admin, Role.Voter, Role.Candidate]), electionController.filtered);
router.get('/election/ended', electionController.showEnded);
router.post('/election/create', validateToken([Role.Organizer]), electionController.create);
router.patch('/election/edit', validateToken([Role.Organizer]), electionController.edit);
router.patch('/election/deployed', validateToken([Role.Organizer]), electionController.deployed);
router.patch('/election/start', validateToken([Role.Organizer]), electionController.start);
router.patch('/election/end', validateToken([Role.Organizer]), electionController.end);
router.get('/election/:uuid', validateToken([Role.Organizer]), electionController.show);
router.delete('/election/:uuid', validateToken([Role.Organizer]), electionController.delete);

// routes - CANDIDATE
router.get('/candidate/', validateToken([Role.Organizer, Role.Voter]), candidateController.index);
router.get('/candidate/filtered/:uuid', validateToken([Role.Organizer, Role.Voter]), candidateController.filteredCandidates);
router.post('/candidate/create', validateToken([Role.Organizer]), candidateController.create);
router.patch('/candidate/edit', validateToken([Role.Organizer, Role.Candidate]), candidateController.edit);
router.patch('/candidate/setInvited', validateToken([Role.Organizer]), candidateController.setInvited);
router.get('/candidate/:uuid', validateToken([Role.Organizer, Role.Candidate]), candidateController.show);
router.delete('/candidate/:uuid', validateToken([Role.Organizer, Role.Candidate]), candidateController.delete);

// routes - OUTLET
router.post('/outlet/create', validateToken([Role.Admin]), outletController.create);
router.get('/outlet/', validateToken([Role.Admin]), outletController.index);
router.delete('/outlet/:api_key', validateToken([Role.Admin]), outletController.delete);

// routes - VOTER
router.get('/voter/', validateToken([Role.Organizer]), voterController.index);
router.get('/voter/filtered/:uuid', validateToken([Role.Organizer]), voterController.filtered);
router.get('/voter/verified/:uuid', validateToken([Role.Organizer]), voterController.verified);
router.post('/voter/create', voterController.create);
router.post('/voter/verify', validateToken([Role.Voter, Role.Organizer]), voterController.verify);
router.post('/voter/verificationStatus', validateToken([Role.Voter]), voterController.verificationStatus);
router.patch('/voter/edit', validateToken([Role.Voter]), voterController.edit);
router.patch('/voter/addWallet', validateToken([Role.Voter, Role.Organizer]), voterController.addWallet);
router.get('/voter/updateVerification/:uuid', validateToken([Role.Organizer]), voterController.updateVerification);
router.get('/voter/:uuid', validateToken([Role.Voter]), voterController.show);
router.delete('/voter/:uuid', validateToken([Role.Voter]), voterController.delete);

// routes - VOTE
router.get('/vote/', voteController.index);
router.post('/vote/create', voteController.create);
router.get('/vote/:uuid', voteController.show);
router.get('/vote/filtered/:uuid', voteController.filteredVotes);

// router - AUTH
router.post('/auth/admin', authController.adminAuth);
router.post('/auth/organizer', authController.oganizerAuth);
router.post('/auth/candidate', authController.candidateAuth);
router.post('/auth/voter', authController.voterAuth);
// logout route
router.get('/auth/logout', authController.logout);
// ping
router.get('/ping', authController.ping)

module.exports = router;