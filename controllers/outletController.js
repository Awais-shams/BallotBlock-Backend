// import models
const {Outlet} = require('../models');


exports.index = async (req, res) => {
    try {
        const outlets = await Outlet.findAll();
        return res.json(outlets);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.create = async (req, res) => {
    const {name, email, apiKey} = req.body;
    try {
        const outlet = await Outlet.create({name, email, apiKey});
        return res.json(outlet);
    } catch(err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.delete = async (req, res) => {
    const apiKey = req.params.api_key
    try {
        const {count} = await Outlet.findAndCountAll({
            where: {apiKey: apiKey}
        });
        if (count < 1) {
            return res.status(404).send({message: "Outlet not found"});
        }
        await Outlet.destroy({
            where: {apiKey: apiKey}
        });
        return res.json({msg: "deleted"});
    } catch (err) {
        return res.status(400).send({message: "Something went wrong!", error: err});
    }
}