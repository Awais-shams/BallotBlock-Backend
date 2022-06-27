// import models
const {Outlet} = require('../../models/');

const isUUIDValid = (key) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const res = regexExp.test(key);

    return res;
}

const validateKey = async (key) => {
    if (!isUUIDValid(key)) {
        return false;
    }
    const outlet = await Outlet.findOne({
        where: {"apiKey": key}
    })
    .catch((err) => {
        console.log("Error");
    })

    if (!outlet) {
        return false;
    }

    return true;
}

module.exports = { validateKey };