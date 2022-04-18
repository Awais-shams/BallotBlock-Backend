// for password encryption
const bcrypt = require('bcrypt');
// salt rounds to encrypt passwords
const saltRounds = 10;
// Import sequelize
const Sequelize = require('sequelize');

// import models
const {Candidate, Organizer, Election} = require('../models');

exports.index = async (req, res) => {
    try {
        const candidates = await Candidate.findAll();
        return res.json(candidates);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.filteredCandidates = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {electionCount, rows: election} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
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

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: candidate} = await Candidate.findAndCountAll({
            where: {uuid: uuid},
            include: Election
        });
        if (count < 1) {
            return res.status(404).send({message: "Candidate not found"});
        }
        return res.json(candidate);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong!", error: err});
    }
}

exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count} = await Candidate.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Candidate not found", error: err});
        }
        await Candidate.destroy({
            where: {uuid: uuid}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({message: "Something went wrong!", error: err});
    }
}

exports.edit = async (req, res) => {
    const {uuid, firstname, lastname, email, password, cnic, dob, permanentAddress} = req.body;
    try {
        const {count} = await Candidate.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Candidate not found"});
        }
        await Candidate.update({firstname, lastname, email, password, cnic, dob, permanentAddress}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.setInvited = async (req, res) => {
    const { uuid } = req.body;
    try {
        const candidate = await Candidate.findOne({
            where: { uuid: uuid }
        })
        console.log(candidate);
        if (candidate) {
            const candi = await Candidate.update({
                invited: true
            }, {
                where: {uuid: uuid}
            })
            
            return res.json({
                message: "Candidate has been added to the Election Smart Contract",
            })
        }
        return res.status(400).send({message: "Invalid canidate"})
    } catch(err) {
        return res.status(400).send({message: "something went wrong"})
    }
}

exports.create = async (req, res) => {
    const {firstname, lastname, email, password, cnic, publicAddress, electionId, dob, permanentAddress} = req.body;
    try {
        const {electionCount, rows: election} = await Election.findAndCountAll({
            where: {uuid: electionId}
        });
        const ElectionId = election[0].id;
        bcrypt.hash(password, saltRounds, async (err, password) => {
            try {
                const candidate = await Candidate.create({firstname, lastname, email, password, cnic, publicAddress, dob, permanentAddress, ElectionId});
                return res.json(candidate);
            } catch(err) {
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(400).send({message: "Email already exists"});
                }
                else{
                    console.log(err);
                    return res.status(400).send({message: err.errors[0].message, error: err});
                }
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: "something went wrong", error: err});
    }
}