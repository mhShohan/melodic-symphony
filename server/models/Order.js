const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.ObjectId, required: true },
    classID: { type: mongoose.Schema.ObjectId, required: true },
    transactionID: { type: String, required: true },
    className: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;