const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { verifyAuth, isAdmin } = require('../middleware/verifyAuth');


router.get('/', verifyAuth, isAdmin, adminController.getAllUsers);
router.get('/classes', verifyAuth, isAdmin, adminController.getAllClasses);
router.patch('/classes/:id', verifyAuth, isAdmin, adminController.updateStatus);
router.delete('/:id', verifyAuth, isAdmin, adminController.deleteUser);
router.patch('/:id', verifyAuth, isAdmin, adminController.updateUser);


module.exports = router;