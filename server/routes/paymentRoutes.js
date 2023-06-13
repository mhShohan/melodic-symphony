const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { verifyAuth, isAdmin } = require('../middleware/verifyAuth');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const Classes = require('../models/Classes');


router.post('/create-payment-intent', verifyAuth, async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });

    res.status(200).json({
        error: null,
        clientSecret: paymentIntent.client_secret
    });
});

router.post('/payment', verifyAuth, async (req, res, next) => {
    try {
        // new mongoose.Types.ObjectId(req.user._id)
        const { classID,
            price,
            instructor,
            className,
            transactionID, } = req.body;

        const body = {
            price,
            instructor,
            className,
            transactionID,
            classID: new mongoose.Types.ObjectId(classID),
            studentID: new mongoose.Types.ObjectId(req.user._id)
        };
        await Classes.findByIdAndUpdate(classID, { $inc: { enrolled: 1 } });
        const newOrder = new Order(body);
        await newOrder.save();

        return res.status(203).json({ error: null, message: 'Order Successfully' });
    } catch (error) {
        next(error);
    }
});

router.get('/payments', async (req, res, next) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        next(error);
    }
});

router.get('/payments/exist/:id', verifyAuth, async (req, res, next) => {
    try {
        const matchClass = await Classes.findById(req.params.id);

        const orders = await Order.findOne({ studentID: req.user._id, classID: req.params.id });

        if (orders) {
            return res.send(false);
        } else {
            if (matchClass.seat <= matchClass.enrolled) {
                return res.send(false);
            }
            return res.send(true);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/orders/student', verifyAuth, async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 7;
        const pageNumber = Number(req.query.page) || 0;
        const skip = pageNumber * pageSize;

        const total = await Order.countDocuments({ studentID: req.user._id });

        const orders = await Order.find({ studentID: req.user._id }).skip(skip).limit(pageSize);

        return res.status(200).json({ error: null, total, orders });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/orders', verifyAuth, isAdmin, async (req, res, next) => {
    try {
        const pageSize = Number(req.query.limit) || 8;
        const pageNumber = Number(req.query.page) || 0;
        const skip = pageNumber * pageSize;

        const total = await Order.countDocuments();

        const orders = await Order.find({}).sort({ createdAt: -1 }).skip(skip).limit(pageSize);

        return res.status(200).json({ error: null, total, orders });
    } catch (error) {
        next(error);
    }
});



module.exports = router;