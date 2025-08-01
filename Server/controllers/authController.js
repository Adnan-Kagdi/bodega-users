const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
        });


        res.status(201).json({ message: 'User created successfully.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};