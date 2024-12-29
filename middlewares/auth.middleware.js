const passport = require('../config/passport-jwt.config');

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error during authentication." });
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
        }
        req.user = user;
        next();
    })(req, res, next);
};

const isAuthorized = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found in request." });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
        }
        next();
    };
};

module.exports = {isAuthorized, authenticateJWT};
