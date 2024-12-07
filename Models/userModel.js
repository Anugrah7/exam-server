const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
}, 
{
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Using the singular form 'user' (MongoDB automatically pluralizes it to 'users')
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
