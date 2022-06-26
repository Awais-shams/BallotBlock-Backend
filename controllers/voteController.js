
// import models
const {Vote} = require('../models');

exports.index = async (req, res) => {
    try {
        const votes = await Vote.findAll();
        return res.json(votes);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}

exports.create = async (req, res) => {
    const {voterAddress, candidateAddress, txHash, electionId} = req.body;
    try {
        const vote = await Vote.create({voterAddress, candidateAddress, txHash, electionId});
        return res.json(vote);
    } catch(err) {
        return res.status(400).send({message: err.errors[0].message, error: err});
    }
}

exports.show = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: vote} = await Vote.findAndCountAll({
            where: {uuid: uuid}
        });
        if (count < 1) {
            return res.status(404).send({message: "Vote not found"});
        }
        return res.json(vote);
    } catch (err) {
        return res.status(400).send({message: "Something went wrong", error: err});
    }
}