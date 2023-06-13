const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const handler = {};
const mongoose = require('mongoose');

handler.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const validPass = await bcrypt.compare(password, user.password);

        if (validPass) {
            const token = generateToken({
                name: user.displayName,
                _id: user._id,
                email: user.email,
                role: user.role,
                photoURL: user.photoURL
            });
            return res.status(200).json({ error: null, token });
        }

        return res.status(403).json({ error: true, massage: 'Wrong Credentials!' });
    } catch (error) {
        next(error);
    }
};

handler.socialLogin = async (req, res, next) => {
    try {
        const {
            displayName,
            email,
            photoURL } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            const token = generateToken({
                name: userExist.displayName,
                _id: userExist._id,
                email: userExist.email,
                role: userExist.role,
                photoURL: userExist.photoURL
            });
            return res.status(200).json({ error: null, token });
        } else {
            const newUser = new User({
                displayName,
                email,
                photoURL
            });
            await newUser.save();

            const token = generateToken({
                name: newUser.displayName,
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                photoURL: newUser.photoURL
            });

            return res.status(200).json({ error: null, token });
        }
    } catch (error) {
        next(error);
    }
};

handler.register = async (req, res, next) => {
    try {
        const {
            displayName,
            email,
            password,
            gender,
            phone,
            address,
            photoURL, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) return res.status(203).json({ error: null, massage: 'User Already Existed!' });

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            displayName,
            email,
            password: hashedPass,
            gender,
            phone,
            address,
            photoURL, role
        });
        await newUser.save();

        res.status(201).json({ error: null, success: true });
    } catch (error) {
        next();
    }
};

handler.checkToken = async (req, res, next) => {
    try {
        const user = req.user;
        const validUser = await User.findOne({ email: user.email }).select('-password');

        return res.status(201).json({ error: false, loggedIn: true, user: validUser });
    } catch (error) {
        next(error);
    }
};

handler.updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, req.body);
        return res.status(200).json({ error: null, message: 'User Updated!' });
    } catch (error) {
        next(error);
    }
};

handler.allInstructors = async (req, res, next) => {
    try {
        const total = await User.countDocuments({ role: 'INSTRUCTOR' });
        const instructors = await User.aggregate([
            {
                $match: { role: 'INSTRUCTOR' }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id',
                    foreignField: 'instructorId',
                    as: 'takenClasses'
                }
            },
            {
                $project: {
                    _id: 1,
                    displayName: 1,
                    email: 1,
                    photoURL: 1,
                    totalClasses: { $size: '$takenClasses' },
                    totalStudents: { $sum: '$takenClasses.enrolled' }
                }
            },
        ]);
        return res.status(200).json({ error: null, total, instructors });
    } catch (error) {
        next(error);
    }
};

handler.singleInstructor = async (req, res, next) => {
    try {
        const instructors = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id',
                    foreignField: 'instructorId',
                    as: 'takenClasses'
                }
            }, {
                $project: {
                    password: 0
                }
            }]);
        // console.log(test);
        // const instructor = await User.findById(req.params.id);
        return res.status(200).json({ error: null, instructor: instructors[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
handler.popularInstructors = async (req, res, next) => {
    try {
        const instructors = await User.aggregate([
            {
                $match: { role: 'INSTRUCTOR' }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id',
                    foreignField: 'instructorId',
                    as: 'takenClasses'
                }
            },
            {
                $project: {
                    _id: 1,
                    displayName: 1,
                    email: 1,
                    photoURL: 1,
                    totalClasses: { $size: '$takenClasses' },
                    totalStudents: { $sum: '$takenClasses.enrolled' }
                }
            },
            {
                $sort: { totalStudents: -1 }
            },
            {
                $limit: 6
            }
        ]);

        return res.status(200).json({ error: null, instructors });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



module.exports = handler;