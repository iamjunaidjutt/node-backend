const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, "Username must be at least 3 characters"],
        maxLength: [50, "Username must be maximum of 50 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'user',
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;