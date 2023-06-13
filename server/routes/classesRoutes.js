const router = require('express').Router();
const classesController = require('../controllers/classesController');
const { verifyAuth, isInstructor, isAdmin } = require('../middleware/verifyAuth');


router.get('/popular', classesController.popularClass);
router.get('/all', classesController.readAllApproved);
router.get('/', verifyAuth, isInstructor, classesController.readAll);
router.post('/', verifyAuth, isInstructor, classesController.create);
router.get('/:id', verifyAuth, classesController.readSingle);
router.patch('/review/:id', verifyAuth, isAdmin, classesController.review);
router.delete('/:id', verifyAuth, isInstructor, classesController.delete);
router.patch('/:id', verifyAuth, isInstructor, classesController.update);


module.exports = router;