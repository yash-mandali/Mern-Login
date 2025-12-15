const e = require('express');
const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const User = await UserModel.findOne({ email });
        if (User) {
            return res.status(409).json({ message: 'User already exists' });
        }
        // Create new user
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'User registered successfully', success: true });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user already exists
        const User = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!User) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, User.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: User.email, _id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: User.name
        });

    } catch (error) {
        res.status(500)
            .json({ message: 'Internal server error', success: false });
    }
}
module.exports = { signup, login };