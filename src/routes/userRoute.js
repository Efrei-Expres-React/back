const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/jwt');

router.get('/me', verifyToken, userController.getMyInfos);

module.exports = router;
