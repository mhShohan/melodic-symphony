const Classes = require('../models/Classes');
const mongoose = require('mongoose');

const handler = {};

handler.readAll = async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 7;
        const pageNumber = Number(req.query.page) || 0;
        const skip = pageNumber * pageSize;

        const total = await Classes.countDocuments({ instructorId: req.user._id });

        const classes = await Classes.find({ instructorId: req.user._id }).skip(skip).limit(pageSize);

        return res.status(200).json({ error: null, total, classes });
    } catch (error) {
        next(error);
    }
};
handler.readSingle = async (req, res, next) => {
    try {
        const classes = await Classes.findById(req.params.id);

        return res.status(200).json({ error: null, classes });
    } catch (error) {
        next(error);
    }
};

handler.popularClass = async (req, res, next) => {
    try {
        const classes = await Classes.find({}).sort({ enrolled: -1 }).limit(6);

        return res.status(200).json({ error: null, classes });
    } catch (error) {
        next(error);
    }
};

handler.readAllApproved = async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 7;
        const pageNumber = Number(req.query.page) || 0;
        const searchText = req.query.search;
        const skip = pageNumber * pageSize;

        const total = await Classes.countDocuments();
        const classes = await Classes.find({
            status: 'APPROVED',
            name: {
                $regex: searchText,
                $options: 'i'
            }
        }).skip(skip).limit(pageSize);

        return res.status(200).json({ error: null, total, classes });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

handler.create = async (req, res, next) => {
    try {
        const body = {
            name: req.body.name,
            photo: req.body.photo,
            seat: Number(req.body.seat),
            price: Number(req.body.price),
            instructorName: req.user.name,
            instructorId: new mongoose.Types.ObjectId(req.user._id),
        };

        const newClass = new Classes(body);
        await newClass.save();

        return res.status(203).json({ error: null, message: 'New Class Created!' });
    } catch (error) {
        next(error);
    }
};

handler.update = async (req, res, next) => {
    try {
        await Classes.findByIdAndUpdate(req.params.id, req.body);

        return res.status(203).json({ error: null, message: 'Updated Successfully' });
    } catch (error) {
        next(error);
    }
};
handler.review = async (req, res, next) => {
    try {
        await Classes.findByIdAndUpdate(req.params.id, req.body);

        return res.status(203).json({ error: null, message: 'Review Successfully' });
    } catch (error) {
        next(error);
    }
};

handler.delete = async (req, res, next) => {
    try {
        await Classes.findByIdAndDelete(req.param.id);
        return res.status(203).json({ error: null, message: 'Class Deleted!' });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;