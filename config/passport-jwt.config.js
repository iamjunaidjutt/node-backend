const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');
require("dotenv").config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload._id);
            console.log(user);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }


            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);

module.exports = passport;