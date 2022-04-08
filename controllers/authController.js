// for password encryption
const bcrypt = require('bcrypt');
// import models
const {Admin, Organizer, Candidate, Voter} = require('../models');
// import JWT for authentication
const {generateToken} = require('../authentication/JWT');
// Import roles
const Role = require('../authentication/roles');


exports.adminAuth = async (req, res) => {
    // Get admin
    const {email, password} = req.body;
    const admin = await Admin.findOne({
        where: {email: email}
    });
    // check if admin exists
    if (!admin) {
        return res.status(404).json({message: "No admin account exists with this email"});
    }
    // verify password
    const hashedPassword = admin.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
            res.status(400).json({message: "Incorrect password"});
        } else {
            // generate JWT
            const accessToken = generateToken(admin, Role.Admin);
            // storing JWT in the cookie
            res.cookie(
                "access-token", accessToken,
                {
                    // expire after 3 hours
                    maxAge: 60*60*3*1000,
                    httpOnly: true
                }
            );
            res.json({
                message: "Signed in",
                uuid: admin.uuid,
                accessToken: accessToken
            });
        }
    });
}

exports.oganizerAuth = async (req, res) => {
    // Get admin
    const {email, password} = req.body;
    const organizer = await Organizer.findOne({
        where: {email: email}
    });
    // check if admin exists
    if (!organizer) {
        return res.status(404).json({message: "No organizer account exists with this email"});
    }
    // verify password
    const hashedPassword = organizer.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
            res.status(400).json({message: "Incorrect password"});
        } else {
            // generate JWT
            const accessToken = generateToken(organizer, Role.Organizer);
            // storing JWT in the cookie
            res.cookie(
                "access-token", accessToken,
                {
                    // expire after 3 hours
                    maxAge: 60*60*3*1000,
                    httpOnly: true
                }
            );
            res.json({
                message: "Signed in",
                accessToken: accessToken
            });
        }
    });
}

exports.candidateAuth = async (req, res) => {
    // Get admin
    const {email, password} = req.body;
    const candidate = await Candidate.findOne({
        where: {email: email}
    });
    // check if admin exists
    if (!candidate) {
        return res.status(404).json({message: "No candidate account exists with this email"});
    }
    // verify password
    const hashedPassword = candidate.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
            res.status(400).json({message: "Incorrect password"});
        } else {
            // generate JWT
            const accessToken = generateToken(candidate, Role.Candidate);
            // storing JWT in the cookie
            res.cookie(
                "access-token", accessToken,
                {
                    // expire after 3 hours
                    maxAge: 60*60*3*1000,
                    httpOnly: true
                }
            );
            res.json({
                message: "Signed in",
                accessToken: accessToken
            });
        }
    });
}

exports.voterAuth = async (req, res) => {
    // Get admin
    const {email, password} = req.body;
    const voter = await Voter.findOne({
        where: {email: email}
    });
    // check if admin exists
    if (!voter) {
        return res.status(404).json({message: "No voter account exists with this email"});
    }
    // verify password
    const hashedPassword = voter.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
            res.status(400).json({message: "Incorrect password"});
        } else {
            // generate JWT
            const accessToken = generateToken(voter, Role.Voter);
            // storing JWT in the cookie
            res.cookie(
                "access-token", accessToken,
                {
                    // expire after 3 hours
                    maxAge: 60*60*3*1000,
                    httpOnly: true
                }
            );
            res.json({
                message: "Signed in",
                accessToken: accessToken
            });
        }
    });
}

exports.logout = async (req, res) => {
    res.clearCookie('access-token');

    res.status(200).json({msg: "Logged out"});
}