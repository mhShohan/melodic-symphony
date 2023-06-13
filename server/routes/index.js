const router = require('express').Router();

router.use('/user', require('./userRoutes'));
router.use('/admin', require('./adminRoute'));
router.use('/classes', require('./classesRoutes'));
router.use('/', require('./paymentRoutes'));


module.exports = router;