
// import models
const {Designation, Organizer} = require('../models');

exports.index = async (req, res) => {
    try {
        const designations = await Designation.findAll({
            include: Organizer
        });
        return res.json(designations);
    } catch (err) {
        return res.status(400).send({msg: "failed", error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: designation} = await Designation.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            throw {msg: "Designation not found"};
        }
        return res.json(designation);
    } catch (err) {
        return res.status(400).send({msg: "failed", error: err});
    }
}

exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count} = await Designation.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            throw {msg: "Designation not found"};
        }
        await Designation.destroy({
            where: {uuid: uuid}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({msg: "failed", error: err});
    }
}

exports.edit = async (req, res) => {
    const {uuid, name, officeLocation} = req.body;
    try {
        const {count} = await Designation.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            throw {msg: "Designation not found"};
        }
        await Designation.update({name, officeLocation}, {
            where: {uuid: uuid}
        });
        return res.json({msg: "edited"});
    } catch (err) {
        return res.status(400).send({msg: "failed", error: err});
    }
}

exports.create = async (req, res) => {
    const {name, officeLocation, organizerId} = req.body;
    try {
        const {count, rows: organizer} = await Organizer.findAndCountAll({
            where: {uuid: organizerId}
        });
        if (count < 1) {
            throw {msg: "Invalid admin"};
        }
        const OrganizerId = organizer[0].id;
        try {
            const designation = await Designation.create({name, officeLocation, OrganizerId});
            return res.json(designation);
        } catch(err) {
            res.status(400).send({msg: "failed", error: err});
        }
    } catch (err) {
        return res.status(400).send({msg: "failed", error: err});
    }
}