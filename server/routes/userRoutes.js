const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAuth } = require('../middleware/verifyAuth');


router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/social-login', userController.socialLogin);
router.post('/check-token', verifyAuth, userController.checkToken);
router.patch('/', verifyAuth, userController.updateUser);
router.get('/instructors', userController.allInstructors);
router.get('/instructors/popular', userController.popularInstructors);
router.get('/instructors/:id', userController.singleInstructor);


module.exports = router;