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
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: JWT token for authentication.
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
 * /api/cv/getAllCvOfUser:
 *   get:
 *     summary: Retrieve all CVs for the authenticated user
 *     description: Fetches all CVs associated with the email extracted from the JWT token of the authenticated user.
 *     tags:
 *       - CV Management API
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvs:
 *                   type: array
 *                   description: List of CVs associated with the authenticated user.
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Title of the CV.
 *                         example: Software Developer CV
 *                       description:
 *                         type: string
 *                         description: Description of the CV.
 *                         example: Experienced in web development.
 *                       email:
 *                         type: string
 *                         description: Email associated with the CV.
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
 *                               description: Type of education.
 *                               example: Bachelor's Degree
 *                             lieuFormation:
 *                               type: string
 *                               description: Place of education.
 *                               example: XYZ University
 *                             dateDebut:
 *                               type: string
 *                               format: date
 *                               description: Start date of the education.
 *                               example: 2018-09-01
 *                             dateFin:
 *                               type: string
 *                               format: date
 *                               description: End date of the education.
 *                               example: 2022-06-30
 *                             description:
 *                               type: string
 *                               description: Description of the education.
 *                               example: Studied Computer Science.
 *                       experienceProfessionnel:
 *                         type: array
 *                         description: List of professional experiences.
 *                         items:
 *                           type: object
 *                           properties:
 *                             poste:
 *                               type: string
 *                               description: Job title.
 *                               example: Backend Developer
 *                             entreprise:
 *                               type: string
 *                               description: Company name.
 *                               example: TechCorp
 *                             dateDebut:
 *                               type: string
 *                               format: date
 *                               description: Start date of the job.
 *                               example: 2022-07-01
 *                             dateFin:
 *                               type: string
 *                               format: date
 *                               description: End date of the job.
 *                               example: 2024-11-01
 *                             missions:
 *                               type: array
 *                               description: List of missions within the job.
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   titre:
 *                                     type: string
 *                                     description: Title of the mission.
 *                                     example: Backend Development
 *                                   description:
 *                                     type: string
 *                                     description: Description of the mission.
 *                                     example: Developed REST APIs for the client.
 *       404:
 *         description: No CVs found for the authenticated user.
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
 *                   example: Some error occurred while getting CVs of user.
 */
router.get('/getAllCvOfUser', cvController.getAllCV)

/**
 * @swagger
 * /api/cv/getCVOfUser:
 *   get:
 *     summary: Get myCvs
 *     description: Retrieves a single CV based on the provided title and email.
 *     tags: 
 *       - CV Management API
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: JWT token for authentication.
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
router.get('/getCVOfUser',verifyToken,cvController.getMyCV)

/**
 * @swagger
 * /api/cv/getAllCV:
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
router.delete('/deleteCVByTitleAndEmail', verifyToken, cvController.deleteCVByTitleAndEmail)

/**
 * @swagger
 * /api/cv/getAllPublicCVTitles:
 *   get:
 *     summary: Retrieve all public CVs with user details
 *     description: Fetches the titles of all public CVs along with the first name and last name of the associated user.
 *     tags: 
 *       - CV Management API
 *     responses:
 *       200:
 *         description: Successfully retrieved public CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Public CV titles fetched successfully.
 *                 cvs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the CV.
 *                         example: Software Developer CV
 *                       user:
 *                         type: object
 *                         properties:
 *                           firstname:
 *                             type: string
 *                             description: The first name of the user associated with the CV.
 *                             example: John
 *                           lastname:
 *                             type: string
 *                             description: The last name of the user associated with the CV.
 *                             example: Doe
 *       404:
 *         description: No public CVs found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No public CVs found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching public CV titles.
 */
router.get('/getPublicVisibleCV', cvController.getAllPublicCVTitles)

/**
 * @swagger
 * /api/cv/getAllPublicCV:
 *   get:
 *     summary: Retrieve all public CVs with detailed user and CV information
 *     description: Fetches all public CVs along with the detailed user information (firstname and lastname) of the associated user.
 *     tags: 
 *       - CV Management API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved public CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Public CV titles fetched successfully.
 *                 cvs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cv:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the CV.
 *                             example: Software Developer CV
 *                           description:
 *                             type: string
 *                             description: A brief description of the CV.
 *                             example: Experienced in web development.
 *                           visibility:
 *                             type: boolean
 *                             description: Visibility status of the CV.
 *                             example: true
 *                           experienceScolaire:
 *                             type: array
 *                             description: List of educational experiences.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                   description: Type of education.
 *                                   example: Bachelor's Degree
 *                                 lieuFormation:
 *                                   type: string
 *                                   description: Place of education.
 *                                   example: XYZ University
 *                                 dateDebut:
 *                                   type: string
 *                                   format: date
 *                                   description: Start date of the education.
 *                                   example: 2018-09-01
 *                                 dateFin:
 *                                   type: string
 *                                   format: date
 *                                   description: End date of the education.
 *                                   example: 2022-06-30
 *                                 description:
 *                                   type: string
 *                                   description: Description of the education.
 *                                   example: Studied Computer Science.
 *                           experienceProfessionnel:
 *                             type: array
 *                             description: List of professional experiences.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 poste:
 *                                   type: string
 *                                   description: Job title.
 *                                   example: Backend Developer
 *                                 entreprise:
 *                                   type: string
 *                                   description: Company name.
 *                                   example: TechCorp
 *                                 dateDebut:
 *                                   type: string
 *                                   format: date
 *                                   description: Start date of the job.
 *                                   example: 2022-07-01
 *                                 dateFin:
 *                                   type: string
 *                                   format: date
 *                                   description: End date of the job.
 *                                   example: 2024-11-01
 *                                 missions:
 *                                   type: array
 *                                   description: List of missions within the job.
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       titre:
 *                                         type: string
 *                                         description: Title of the mission.
 *                                         example: Backend Development
 *                                       description:
 *                                         type: string
 *                                         description: Description of the mission.
 *                                         example: Developed REST APIs for the client.
 *                       user:
 *                         type: object
 *                         properties:
 *                           firstname:
 *                             type: string
 *                             description: The first name of the user associated with the CV.
 *                             example: John
 *                           lastname:
 *                             type: string
 *                             description: The last name of the user associated with the CV.
 *                             example: Doe
 *       403:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       404:
 *         description: No public CVs found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No public CVs found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching public CV titles.
 */
router.get('/getAllPublicCV',verifyToken, cvController.getAllPublicCV)

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Update a CV
 *     description: Updates an existing CV owned by the authenticated user. The user must be authenticated using a Bearer token.
 *     tags:
 *       - CV Management API
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: JWT token for authentication.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 640f5b6d8f2c3b8d1c9d1e23
 *         description: The ID of the CV to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the CV.
 *                 example: Updated Software Developer CV
 *               description:
 *                 type: string
 *                 description: The updated description of the CV.
 *                 example: Updated description for the CV.
 *               visibility:
 *                 type: boolean
 *                 description: The updated visibility status of the CV.
 *                 example: false
 *               experienceScolaire:
 *                 type: array
 *                 description: List of updated educational experiences.
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: Master's Degree
 *                     lieuFormation:
 *                       type: string
 *                       example: University B
 *                     dateDebut:
 *                       type: string
 *                       format: date
 *                       example: 2020-09-01
 *                     dateFin:
 *                       type: string
 *                       format: date
 *                       example: 2022-06-30
 *                     description:
 *                       type: string
 *                       example: Studied Advanced Computer Science.
 *               experienceProfessionnel:
 *                 type: array
 *                 description: List of updated professional experiences.
 *                 items:
 *                   type: object
 *                   properties:
 *                     poste:
 *                       type: string
 *                       example: Full-Stack Developer
 *                     entreprise:
 *                       type: string
 *                       example: TechCorp
 *                     dateDebut:
 *                       type: string
 *                       format: date
 *                       example: 2023-01-01
 *                     dateFin:
 *                       type: string
 *                       format: date
 *                       example: 2024-12-31
 *                     missions:
 *                       type: array
 *                       description: List of updated missions in the role.
 *                       items:
 *                         type: object
 *                         properties:
 *                           titre:
 *                             type: string
 *                             example: Developed API endpoints
 *                           description:
 *                             type: string
 *                             example: Built scalable API endpoints for client use.
 *     responses:
 *       200:
 *         description: Successfully updated the CV.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV updated successfully.
 *                 cv:
 *                   type: object
 *                   description: The updated CV object.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 640f5b6d8f2c3b8d1c9d1e23
 *                     title:
 *                       type: string
 *                       example: Updated Software Developer CV
 *                     description:
 *                       type: string
 *                       example: Updated description for the CV.
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     visibility:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: CV not found or user does not have permission to update it.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV not found or you do not have permission to update it.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error occurred while updating the CV.
 */
router.put('/update', verifyToken, cvController.updateCV )

/**
 * @swagger
 * /api/cv/one/{id}:
 *   get:
 *     summary: Get CV by Id
 *     description: Fetches all CV documents from the database.
 *     tags: 
 *       - CV Management API
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the CV to retrieve
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
router.get('/one/:id', verifyToken, cvController.getCvById)

module.exports = router;