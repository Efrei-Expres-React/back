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
 * /api/cv/create:
 *   post:
 *     summary: Create a new CV
 *     description: Creates a new CV associated with the authenticated user.
 *     tags:
 *       - CV Management API
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - visibility
 *               - experienceScolaire
 *               - experienceProfessionnel
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the CV.
 *                 example: Backend Developer CV
 *               description:
 *                 type: string
 *                 description: A brief description of the CV.
 *                 example: Specialized in backend development using Node.js.
 *               visibility:
 *                 type: boolean
 *                 description: Whether the CV is public or private.
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
 *                       example: University of Technology
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
 *                       example: Major in Computer Science.
 *               experienceProfessionnel:
 *                 type: array
 *                 description: List of professional experiences.
 *                 items:
 *                   type: object
 *                   properties:
 *                     poste:
 *                       type: string
 *                       example: Backend Developer
 *                     entreprise:
 *                       type: string
 *                       example: Tech Solutions Inc.
 *                     dateDebut:
 *                       type: string
 *                       format: date
 *                       example: 2020-01-01
 *                     dateFin:
 *                       type: string
 *                       format: date
 *                       example: 2023-06-30
 *                     missions:
 *                       type: array
 *                       description: List of tasks during the role.
 *                       items:
 *                         type: object
 *                         properties:
 *                           titre:
 *                             type: string
 *                             example: API Development
 *                           description:
 *                             type: string
 *                             example: Designed and implemented REST APIs.
 *     responses:
 *       201:
 *         description: Successfully created a new CV.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV created successfully.
 *                 cv:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Backend Developer CV
 *                     description:
 *                       type: string
 *                       example: Specialized in backend development using Node.js.
 *                     visibility:
 *                       type: boolean
 *                       example: true
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access, token required.
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
router.post('/create', verifyToken, cvController.createCV);

/**
 * @swagger
 * /api/cv/getAllCvTitleOfUser:
 *   post:
 *     summary: Retrieve all CVs for a specific email
 *     description: Returns a list of all CVs associated with the specified email.
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
 *                 description: The email address to search CVs for.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Successfully retrieved CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvs:
 *                   type: array
 *                   description: List of CVs associated with the email.
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the CV.
 *                         example: Frontend Developer CV
 *                       description:
 *                         type: string
 *                         description: A brief description of the CV.
 *                         example: A detailed CV for a frontend developer role.
 *                       email:
 *                         type: string
 *                         description: The email associated with the CV.
 *                         example: user@example.com
 *                       visibility:
 *                         type: boolean
 *                         description: Visibility status of the CV.
 *                         example: true
 *                       experienceScolaire:
 *                         type: array
 *                         description: List of educational experiences.
 *                         items:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                               example: Bachelor's Degree
 *                             lieuFormation:
 *                               type: string
 *                               example: University A
 *                             dateDebut:
 *                               type: string
 *                               format: date
 *                               example: 2015-09-01
 *                             dateFin:
 *                               type: string
 *                               format: date
 *                               example: 2019-06-30
 *                             description:
 *                               type: string
 *                               example: Studied Computer Science.
 *                       experienceProfessionnel:
 *                         type: array
 *                         description: List of professional experiences.
 *                         items:
 *                           type: object
 *                           properties:
 *                             poste:
 *                               type: string
 *                               example: Frontend Developer
 *                             entreprise:
 *                               type: string
 *                               example: TechCorp
 *                             dateDebut:
 *                               type: string
 *                               format: date
 *                               example: 2020-01-01
 *                             dateFin:
 *                               type: string
 *                               format: date
 *                               example: 2022-12-31
 *                             missions:
 *                               type: array
 *                               description: List of missions in the role.
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   titre:
 *                                     type: string
 *                                     example: Developed User Interfaces
 *                                   description:
 *                                     type: string
 *                                     example: Built responsive web applications.
 *       404:
 *         description: No CVs found for the given email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No CVs found for email 'user@example.com'.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving CVs.
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
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
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
 *                   description: Successfull message.
 *                   
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
router.delete('/deleteCVByTitleAndEmail',verifyToken ,cvController.deleteCVByTitleAndEmail)

module.exports = router;