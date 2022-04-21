// for password encryption
const bcrypt = require('bcrypt');
// salt rounds to encrypt passwords
const saltRounds = 10;
// Import sequelize
const Sequelize = require('sequelize');

// import models
const {Voter, Election, RegisteredVoter} = require('../models');

exports.index = async (req, res) => {
    try {
        const voter = await Voter.findAll();
        return res.json(voter);
    } catch (err) {
        return res.status(400).send({message: "something went wrong", error: err});
    }
}

exports.filtered = async (req, res) => {
    const uuid = req.params.uuid;
    console.log(uuid);
    try {
        const election = await Election.findOne({
            where: {uuid: uuid}
        })
        if (!election) {
            return res.status(400).send({message: "Invalid Election"}); 
        }
        const id = election.id;
        console.log(id);
        const voter = await RegisteredVoter.findAll({
            where: {ElectionId: id, registered: false},
            include: [Voter, Election]
        })
        return res.json(voter);
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: "something went wrong", error: err});
    }
}

exports.verified = async (req, res) => {
    const uuid = req.params.uuid;
    console.log(uuid);
    try {
        const election = await Election.findOne({
            where: {uuid: uuid}
        })
        if (!election) {
            return res.status(400).send({message: "Invalid Election"}); 
        }
        const id = election.id;
        console.log(id);
        const voter = await RegisteredVoter.findAll({
            where: {ElectionId: id, registered: true},
            include: Voter
        })
        return res.json(voter);
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: "something went wrong", error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: voter} = await Voter.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Voter not found"});
        }
        return res.json(voter);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count} = await Voter.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Voter not found"});
        }
        await Voter.destroy({
            where: {uuid: uuid}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.verificationStatus = async (req, res) => {
    const {givenId, voterId, electionId} = req.body
    try {
        const {electionCount, rows: election} = await Election.findAndCountAll({
            where: {uuid: electionId}
        });
        if (election.length < 1) {
            return res.status(400).send({message: "Invalid election"})
        }
        console.log(electionCount);
        const ElectionId = election[0].id;
        const {voterCount, rows: voter} = await Voter.findAndCountAll({
            where: {uuid: voterId}
        });
        if (voter.length < 1) {
            return res.status(400).send({message: "Invalid voter"})
        }
        const VoterId = voter[0].id;
        const regsiteredVoter = await RegisteredVoter.findOne({
            where: {
                GivenId: givenId,
                ElectionId: ElectionId,
                VoterId: VoterId
            }
        });
        if (regsiteredVoter) {
            if (regsiteredVoter.registered) {
                return res.json({status: "verified"})
            } else {
                return res.json({status: "not verified"})
            }
        } else {
            return res.json({status: "no voter found"})
        }
    } catch(err) {
        console.log(err)
        return res.status(400).send({message: "something went wrong"})
    }
}

exports.verify = async (req, res) => {
    const {electionId, voterId, givenId, VoterAddress} = req.body
    try {
        const {registeredVoterCount, rows: registeredVoter} = await RegisteredVoter.findAndCountAll({
            where: {GivenId: givenId}
        });
        if (registeredVoter.length > 0) {
            return res.status(400).send({message: "Voter already registered"});
        }
        const {electionCount, rows: election} = await Election.findAndCountAll({
            where: {uuid: electionId}
        });
        console.log(electionCount);
        const ElectionId = election[0].id;
        const {voterCount, rows: voter} = await Voter.findAndCountAll({
            where: {uuid: voterId}
        });
        const VoterId = voter[0].id;
        const GivenId = givenId;
        const registereVoter = await RegisteredVoter.create({ElectionId, VoterId, GivenId, VoterAddress});
        return res.json(registereVoter)
    } catch(err) {
        console.log(err);
        return res.status(400).send({message: "something went wrong"});
    }
}

exports.updateVerification = async (req, res) => {
    const uuid = req.params.uuid;
    const registered = true;
    try {
        const {count} = await RegisteredVoter.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Voter not found"});
        }
        await RegisteredVoter.update({registered}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.edit = async (req, res) => {
    const {uuid, firstname, lastname, email, password, cnic, dob, permanentAddress} = req.body;
    try {
        const {count} = await Voter.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Voter not found"});
        }
        await Voter.update({firstname, lastname, email, password, cnic, dob, permanentAddress}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.create = (req, res) => {
    const {firstname, lastname, email, password, cnic, dob, permanentAddress} = req.body;
    try {
        bcrypt.hash(password, saltRounds, async (err, password) => {
            try {
                const voter = await Voter.create({firstname, lastname, email, password, cnic, dob, permanentAddress});
                return res.json(voter);
            } catch(err) {
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(400).send({message: "Email already exists"});
                }
                else { 
                    return res.status(400).send({message: err.errors[0].message, error: err});
                }
            }
        });
    } catch(err) {
        res.status(400).send({message: "Something went wrong", error: err});
    }
}