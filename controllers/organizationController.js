
// import models
const {Organization} = require('../models');

exports.index = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        return res.json(organizations);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: organization} = await Organization.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Organization not found"});
        }
        return res.json(organization);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count} = await Organization.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Organization not found"});
        }
        await Organization.destroy({
            where: {uuid: uuid}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.edit = async (req, res) => {
    const {uuid, name, location, website} = req.body;
    try {
        const {count} = await Organization.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Organization not found"});
        }
        await Organization.update({name, location, website}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.create = async (req, res) => {
    const {name, location, website} = req.body;
    try {
        try {
            const organization = await Organization.create({name, location, website});
            return res.json(organization);
        } catch(err) {
            res.status(400).send({message: err.errors[0].message, error: err});
        }
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}