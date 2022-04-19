
// import models
const {Election, Organization, Candidate} = require('../models');

exports.index = async (req, res) => {
    try {
        const elections = await Election.findAll({
            include: Organization
        });
        return res.json(elections);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.filtered = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const election = await Candidate.findOne({
            where: {uuid: uuid},
            include: Election
        });
        return res.json([election]);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: election} = await Election.findAndCountAll({
            where: {uuid: uuid},
            include: Organization
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        return res.json(election);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        await Election.destroy({
            where: {uuid: uuid}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }   
}

exports.edit = async (req, res) => {
    const {uuid, name, startDate, endDate, designation} = req.body;
    try {
        const {count} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        await Election.update({name, startDate, endDate, designation}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.create = async (req, res) => {
    const {name, startDate, endDate, designation, organizationId} = req.body;
    try {
        const {count, rows: organizations} = await Organization.findAndCountAll({
            where: {uuid: organizationId}
        });
        if (count < 1) {
            return res.status(404).send({message: "Invalid organization."});
        }
        const OrganizationId = organizations[0].id;
        try {
            const election = await Election.create({name, startDate, endDate, designation, OrganizationId});
            return res.json(election);
        } catch(err) {
            console.log(err);
            res.status(400).send({message: err.errors[0].message, error: err});
        }
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.deployed = async (req, res) => {
    const {uuid, contractAddress, deployTxHash} = req.body;
    const status = "DEPLOYED";
    try {
        const {count} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        await Election.update({contractAddress, deployTxHash, status}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.start = async (req, res) => {
    const {uuid} = req.body;
    const status = "VOTING";
    console.log("HERE check");
    try {
        const {count} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        const election = await Election.update({status}, {
            where: {uuid: uuid}
        });
        console.log(election);
        return res.json({msg: "edited"});
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.end = async (req, res) => {
    const {uuid} = req.body;
    const status = "ENDED";
    try {
        const {count} = await Election.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Election not found"});
        }
        const election = await Election.update({status}, {
            where: {uuid: uuid}
        });
        console.log(election);
        return res.json({msg: "edited"});
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}