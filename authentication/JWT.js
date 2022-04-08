const {sign, verify} = require('jsonwebtoken');

const generateToken = (model, role) => {
    const accessToken = sign(
        {
            id: model.id,
            role: role
        },
        process.env.TOKEN_SECRET,
        // TOKEN expires after two hours
        { expiresIn: 60 * 60 * 2 }
    );

    return accessToken;
}

// authorizes user role
const authorize = (payloadRole, roles = [], req, res) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    if (roles.length && !roles.includes(payloadRole)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'User is unauthorized access this resource' });
    }

    req.authorized = true;
    return;
}

const authenticate = (accessToken, req, res) => {
    if (!accessToken) {
        return res.status(400).json({error: "User not authenticated"});
    }

    try {
        const validToken = verify(accessToken, process.env.TOKEN_SECRET);
        if (validToken) {
            req.authenticated = true;
            userRole = validToken.role;
            return userRole;
        }
    } catch (err) {
        return res.status(400).json({error: "Invalid access token!"});
    }
}

const validateToken = (roles = []) => {

    return (req, res, next) => {
        const accessToken = req.cookies['access-token'];

        // authenticate access token
        userRole = authenticate(accessToken, req, res);

        if (!req.authenticated) {
            return;
        }

        // Authorize user role
        authorize(userRole, roles, req, res);

        if (req.authorized) {
            next();
        }
    }
}

module.exports = { generateToken, validateToken };