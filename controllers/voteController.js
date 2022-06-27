
// import models
const {Vote, Election} = require('../models');

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
        const {count, rows: elections} = await Election.findAndCountAll({
            where: {uuid: electionId}
        });
        // console.log(elections[0].id);
        if (count < 1) {
            return res.status(404).send({message: "Invalid election."});
        }
        const ElectionId = elections[0].id;
        console.log("Hello: ", electionId);
        const vote = await Vote.create(
            {voterAddress, candidateAddress, txHash, ElectionId});
        return res.json(vote);
    } catch(err) {
        return res.status(400).send({message: "Something went wrong", error: err});
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

exports.filteredVotes = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const {count, rows: elections} = await Election.findAndCountAll({
            where: {uuid: uuid}
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