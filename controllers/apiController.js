// Import sequelize
const Sequelize = require('sequelize');

// import models
const {Election, Organization, Vote, Candidate} = require('../models');

// import authentication middleware
const {validateKey} = require('../authentication/api/authentication');

exports.test = async (req, res) => {
    if (!(await validateKey(req.params.key))) {
        return res.status(401).json({"message": "unautorized"});
    }
    return res.json({"message": "success"});
}

exports.elections = async (req, res) => {
    if (!(await validateKey(req.params.key))) {
        return res.status(401).json({"message": "unautorized"});
    }
    try {
        const elections = await Election.findAll({
            include: Organization
        });
        return res.json(elections);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.organizations = async (req, res) => {
    if (!(await validateKey(req.params.key))) {
        return res.status(401).json({"message": "unautorized"});
    }
    try {
        const organizations = await Organization.findAll();
        return res.json(organizations);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.audit = async (req, res) => {
    console.log(req.params);
    if (!(await validateKey(req.params.key))) {
        return res.status(401).json({"message": "unautorized"});
    }
    try {
        const {count, rows: elections} = await Election.findAndCountAll({
            where: {uuid: req.params.electionId}
        });
        // console.log(elections[0].id);
        if (count < 1) {
            return res.status(404).send({message: "Invalid election."});
        }
        const ElectionId = elections[0].id;
        const votes = await Vote.findAll({
            where: { ElectionId: ElectionId }
        })
        return res.json(votes);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.candidates = async (req, res) => {
    console.log(req.params);
    if (!(await validateKey(req.params.key))) {
        return res.status(401).json({"message": "unautorized"});
    }
    try {
        const {count, rows: election} = await Election.findAndCountAll({
            where: {uuid: req.params.electionId}
        });
        if (count < 1) {
            return res.status(404).send({message: "Invalid election."});
        }
        const id = election[0].id;
        const candidates = await Candidate.findAll({
            where: {ElectionId: id}
        });
        return res.json(candidates);
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}