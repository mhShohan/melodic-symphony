const jwt = require('jsonwebtoken');

const handler = {};

handler.verifyAuth = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (bearer) {
        const token = bearer.split(' ')[1];

        if (!token) return res.status(401).json({ error: true, loggedIn: false, msg: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } else {
        return res.status(401).json({ error: true, loggedIn: false, msg: 'Unauthorized' });
    }
};

handler.isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: true, message: 'Forbidden! You are not an ADMIN' });
    next();
};

handler.isInstructor = (req, res, next) => {
    if (req.user.role !== 'INSTRUCTOR') return res.status(403).json({ error: true, message: 'Forbidden! You are not an INSTRUCTOR' });
    next();
};

module.exports = handler;