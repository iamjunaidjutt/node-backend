const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwt.utils');
const User = require('../models/user.model');
const registerSchema = require('../utils/schema/register.schema');
const loginSchema = require('../utils/schema/login.schema');

const register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    const { username, email, password } = value;

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
        return res.status(500).json({ message: 'Failed to register: ' + err.message });
    }
};


const login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = value;

    try {
        const user = await User.findOne({ email });
        
        console.log(email);
        console.log(password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ _id: user._id, email: user.email, role: user.role });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                _id: user._id,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: `Login failed: ${err.message}` });
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        return res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = { register, login, logout };
