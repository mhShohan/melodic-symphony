const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    photoURL: { type: String, default: '' },
    role: { type: String, enum: ['ADMIN', 'STUDENT', 'INSTRUCTOR'], default: 'STUDENT' }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;