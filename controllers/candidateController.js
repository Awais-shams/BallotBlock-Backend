// for password encryption
const bcrypt = require('bcrypt');
// salt rounds to encrypt passwords
const saltRounds = 10;
// Import sequelize
const Sequelize = require('sequelize');

// import models
const {Candidate, Organizer} = require('../models');

exports.index = async (req, res) => {
    try {
        const candidates = await Candidate.findAll({
            include: Organizer
        });
        return res.json(candidates);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: candidate} = await Candidate.findAndCountAll({
            where: {uuid: uuid}
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

exports.create = async (req, res) => {
    const {firstname, lastname, email, password, cnic, dob, permanentAddress, organizerId} = req.body;
    try {
        const {count, rows: organizer} = await Organizer.findAndCountAll({
            where: {uuid: organizerId}
        });
        if (count < 1) {
            return res.status(400).send({message: "You cannot perform this operation", error: err});
        }
        const OrganizerId = organizer[0].id;
        bcrypt.hash(password, saltRounds, async (err, password) => {
            try {
                const candidate = await Candidate.create({firstname, lastname, email, password, cnic, dob, permanentAddress, OrganizerId});
                return res.json(candidate);
            } catch(err) {
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(400).send({message: "Email already exists"});
                }
                else{
                    return res.status(400).send({message: err.errors[0].message, error: err});
                }
            }
        });
    } catch (err) {
        return res.status(400).send({message: "something went wrong", error: err});
    }
}