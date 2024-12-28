const isAuthorized = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "You must be logged in to access this resource." });
        }

        if (allowedRoles.includes(req.user.role)) {
            return next();
        }

        return res.status(403).json({ message: "You do not have permission to access this resource." });
    };
};

module.exports = isAuthorized;
