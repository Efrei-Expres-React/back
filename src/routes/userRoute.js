const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/jwt');

router.get('/me', verifyToken, userController.getMyInfos);
router.put('/me', verifyToken, userController.updateMyInfos);

module.exports = router;
