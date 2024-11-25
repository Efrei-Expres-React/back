const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/jwt');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user informations
 */


/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get my infos
 *     description: Retrieve my user's informations
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 firstname:
 *                   type: string
 *                   description: The first name of the user.
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   description: The last name of the user.
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                   example: john.doe@example.com
 *                 bio:
 *                   type: string
 *                   description: The bio of the user.
 *                   example: "I love drawing"
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.get('/me', verifyToken, userController.getMyInfos);

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     summary: Update infos
 *     description: Update my details
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *               bio:
 *                 type: string
 *                 description: The user's description
 *                 example: "I love drawing"
 *               birth:
 *                 type: string
 *                 format : date
 *                 description: The user's description
 *                 example: "1990-05-15"
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Successfull message.
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.put('/me', verifyToken, userController.updateMyInfos);

module.exports = router;
