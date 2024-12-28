const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user.model');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id,
            },
        });

    } catch (err) {
        return res.status(500).json({ message: `Failed to register: ${err.message}` });
    }
};

const login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(500).json({ message: `Login failed: ${err.message}` });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log in after authentication' });
            }
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                },
            });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        return res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = {register, login, logout};