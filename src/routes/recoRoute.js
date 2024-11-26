const router = require('express').Router();
const recoController = require('../controllers/recoController');
const { verifyToken } = require('../middlewares/jwt');

/**
 * @swagger
 * tags:
 *   name: Recommandation
 *   description: API for CV recommandations
 */



/**
 * @swagger
 * /api/reco/:
 *   post:
 *     summary: Create reco
 *     description: Create someone recommandation
 *     tags:
 *       - Recommandation
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 description: cv ID.
 *                 example: jfjdkdkslslsmz
 *               message:
 *                 type: string
 *                 description: recommandation.
 *                 example: c'est super
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
router.post('/', verifyToken, recoController.createReco);


/**
 * @swagger
 * /api/reco/{id}:
 *   delete:
 *     summary: Delete reco
 *     description: Delete someone recommandation
 *     tags:
 *       - Recommandation
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recommendation to delete
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
router.delete('/:id', verifyToken, recoController.deleteReco);

/**
 * @swagger
 * /api/reco/:
 *   get:
 *     summary: Get all my recos
 *     description: Get all my recommandation
 *     tags:
 *       - Recommandation
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.get('/', verifyToken, recoController.getALlMyRecos);


/**
 * @swagger
 * /api/reco/{id}:
 *   get:
 *     summary: Get CV reco
 *     description: Get recommandations from only one CV
 *     tags:
 *       - Recommandation
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recommendation to delete
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
router.get('/:id', verifyToken, recoController.getCvRecomandations);



module.exports = router;
