const {sign, verify} = require('jsonwebtoken');

const generateToken = (model) => {
    const accessToken = sign(
        {id: model.id},
        process.env.TOKEN_SECRET,
        // TOKEN expires after two hours
        { expiresIn: 60 * 60 * 2 }
    );

    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];

    if (!accessToken) {
        return res.status(400).json({error: "User not authenticated"});
    }

    try {
        const validToken = verify(accessToken, process.env.TOKEN_SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports = { generateToken, validateToken };