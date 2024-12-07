const User = require('../Models/usermodel');  // Import the correct User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login an existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If no user is found, return a 404 error
        if (!user) return res.status(404).json({ message: "User not found" });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate a JWT token if credentials are correct
        const token = jwt.sign({ id: user._id }, process.env.JWTKEY, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// List all users
const listUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');  // Exclude the password from the response
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// View details of a specific user
const viewUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');  // Exclude the password
        if (!user) return res.status(404).json({ message: "User not Found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, listUsers, viewUserDetails };
