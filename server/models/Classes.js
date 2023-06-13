const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructorName: { type: String, required: true },
    instructorId: { type: mongoose.Schema.ObjectId, required: true },
    photo: { type: String, required: true },
    seat: { type: Number, required: true },
    enrolled: { type: Number, default: 0 },
    review: { type: String, default: '' },
    price: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'DENY', 'APPROVED'], default: 'PENDING' }
}, { timestamps: true });

const Classes = mongoose.model('class', classesSchema);

module.exports = Classes;