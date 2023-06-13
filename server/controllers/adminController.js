const User = require("../models/User");
const Classes = require('../models/Classes');

const handler = {};

handler.getAllUsers = async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 6;
        const pageNumber = Number(req.query.page) || 0;
        const skip = pageNumber * pageSize;

        const total = await User.countDocuments();


        const users = await User.find({}).skip(skip).limit(pageSize);
        return res.status(200).json({ error: null, total, isAdmin: true, users });
    } catch (error) {
        next(error);
    }
};

handler.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ error: null, message: 'User Deleted!' });
    } catch (error) {
        next(error);
    }
};

handler.updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
        return res.status(200).json({ error: null, message: 'Admin Created!' });
    } catch (error) {
        next(error);
    }
};

handler.getAllClasses = async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 7;
        const pageNumber = Number(req.query.page) || 0;
        const skip = pageNumber * pageSize;

        const total = await Classes.countDocuments();

        const classes = await Classes.find({}).skip(skip).limit(pageSize);

        return res.status(200).json({ error: null, total, classes });
    } catch (error) {
        next(error);
    }
};

handler.updateStatus = async (req, res, next) => {
    try {
        await Classes.findByIdAndUpdate(req.params.id, { status: req.body.status });
        return res.status(203).json({ error: null, message: 'Status Updated!' });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;