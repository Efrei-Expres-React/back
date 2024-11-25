const router = require('express').Router();
const cvController = require('../controllers/cvController');
const { verifyToken } = require('../middlewares/jwt');

/**
 * @swagger
 * tags:
 *   name: CV Management API
 *   description: API for managing CVs, including creating, retrieving, and deleting CVs.
 */


/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new CV
 *     description: Creates a new CV document in the database with the provided details.
 *     tags: 
 *       - CV Management API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - email
 *               - visibility
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the CV.
 *                 example: Frontend Developer CV
 *               description:
 *                 type: string
 *                 description: A brief description of the CV.
 *                 example: A detailed CV for a frontend developer role.
 *               email:
 *                 type: string
 *                 description: The email associated with the CV.
 *                 example: user@example.com
 *               visibility:
 *                 type: boolean
 *                 description: Visibility status of the CV.
 *                 example: true
 *               experienceScolaire:
 *                 type: array
 *                 description: List of educational experiences.
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: Bachelor's Degree
 *                     lieuFormation:
 *                       type: string
 *                       example: University A
 *                     dateDebut:
 *                       type: string
 *                       format: date
 *                       example: 2015-09-01
 *                     dateFin:
 *                       type: string
 *                       format: date
 *                       example: 2019-06-30
 *                     description:
 *                       type: string
 *                       example: Studied Computer Science.
 *               experienceProfessionnel:
 *                 type: array
 *                 description: List of professional experiences.
 *                 items:
 *                   type: object
 *                   properties:
 *                     poste:
 *                       type: string
 *                       example: Frontend Developer
 *                     entreprise:
 *                       type: string
 *                       example: TechCorp
 *                     dateDebut:
 *                       type: string
 *                       format: date
 *                       example: 2020-01-01
 *                     dateFin:
 *                       type: string
 *                       format: date
 *                       example: 2022-12-31
 *                     missions:
 *                       type: array
 *                       description: List of missions in the role.
 *                       items:
 *                         type: object
 *                         properties:
 *                           titre:
 *                             type: string
 *                             example: Developed User Interfaces
 *                           description:
 *                             type: string
 *                             example: Built responsive web applications.
 *     responses:
 *       201:
 *         description: Successfully created the CV.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV successfully created.
 *                 cv:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 645fcdf7c7e28
 *                     title:
 *                       type: string
 *                       example: Frontend Developer CV
 *                     description:
 *                       type: string
 *                       example: A detailed CV for a frontend developer role.
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     visibility:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating the CV.
 */
router.post('/create', cvController.createCV);

/**
 * @swagger
 * /api/cv/getAllCvTitleOfUser:
 *   post:
 *     summary: Get all CV titles for a given email
 *     description: Retrieves all CV titles associated with a specific email.
 *     tags: 
 *       - CV Management API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email associated with the CVs.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Successfully retrieved all CV titles for the given email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Frontend Developer CV
 *       404:
 *         description: No CV titles found for the given email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No CV titles found for email 'user@example.com'.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving CV titles.
 */
router.get('/getAllCvTitleOfUser', cvController.getAllCVTitles)

/**
 * @swagger
 * /api/cv/getCVOfUser:
 *   post:
 *     summary: Get a CV by title and email
 *     description: Retrieves a single CV based on the provided title and email.
 *     tags: 
 *       - CV Management API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - title
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email associated with the CV.
 *                 example: user@example.com
 *               title:
 *                 type: string
 *                 description: The title of the CV.
 *                 example: Frontend Developer CV
 *     responses:
 *       200:
 *         description: Successfully retrieved the CV.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cv:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Frontend Developer CV
 *                     visibility:
 *                       type: boolean
 *                       example: true
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     description:
 *                       type: string
 *                       example: A detailed CV for a frontend developer role.
 *       404:
 *         description: CV not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No CV found with title 'Frontend Developer CV' for email 'user@example.com'.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving the CV.
 */
router.get('/getCVOfUser', cvController.getOneCV)

/**
 * @swagger
 * /api/cv/getAllCVs:
 *   get:
 *     summary: Get all CVs
 *     description: Fetches all CV documents from the database.
 *     tags: 
 *       - CV Management API
 *     responses:
 *       200:
 *         description: Successfully retrieved all CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 645fcdf7c7e28
 *                       title:
 *                         type: string
 *                         example: Frontend Developer CV
 *                       visibility:
 *                         type: boolean
 *                         example: true
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       description:
 *                         type: string
 *                         example: A detailed CV for a frontend developer role.
 *       404:
 *         description: No CVs found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No CVs found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching all CVs.
 */
router.get('/getAllCV', cvController.getAllCVs)

/**
 * @swagger
 * /api/cv/deleteCVByTitleAndEmail:
 *   delete:
 *     summary: Delete a CV by title and email
 *     description: Deletes a CV document from the database based on the provided title and email.
 *     tags: 
 *       - CV Management API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - title
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email associated with the CV to be deleted.
 *                 example: user@example.com
 *               title:
 *                 type: string
 *                 description: The title of the CV to be deleted.
 *                 example: Frontend Developer CV
 *     responses:
 *       200:
 *         description: Successfully deleted the CV.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV titled 'Frontend Developer CV' for email 'user@example.com' was successfully deleted.
 *                 deletedCV:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 645fcdf7c7e28
 *                     title:
 *                       type: string
 *                       example: Frontend Developer CV
 *                     visibility:
 *                       type: boolean
 *                       example: true
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     description:
 *                       type: string
 *                       example: A detailed CV for a frontend developer role.
 *                     experienceScolaire:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Bachelor's Degree
 *                           lieuFormation:
 *                             type: string
 *                             example: University A
 *                           dateDebut:
 *                             type: string
 *                             format: date
 *                             example: 2015-09-01
 *                           dateFin:
 *                             type: string
 *                             format: date
 *                             example: 2019-06-30
 *                           description:
 *                             type: string
 *                             example: Studied Computer Science.
 *                     experienceProfessionnel:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           poste:
 *                             type: string
 *                             example: Frontend Developer
 *                           entreprise:
 *                             type: string
 *                             example: TechCorp
 *                           dateDebut:
 *                             type: string
 *                             format: date
 *                             example: 2020-01-01
 *                           dateFin:
 *                             type: string
 *                             format: date
 *                             example: 2022-12-31
 *                           missions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 titre:
 *                                   type: string
 *                                   example: Developed User Interfaces
 *                                 description:
 *                                   type: string
 *                                   example: Built responsive web applications.
 *       404:
 *         description: CV not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No CV found with title 'Frontend Developer CV' for email 'user@example.com'.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while deleting the CV.
 */
router.delete('/deleteCVByTitleAndEmail', cvController.deleteCVByTitleAndEmail)

module.exports = router;