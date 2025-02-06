const express = require('express');
const {
  getChances,
  getChance,
  addChance,
  updateChance,
  deleteChance,
} = require('../controllers/chance');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getChances).post(protect, addChance);
router
  .route('/:id')
  .get(getChance)
  .put(protect, updateChance)
  .delete(protect, deleteChance);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: CHANCE
 *  description: chances routes
 *
 */

// get all chances
/**
 * @swagger
 * /api/v1/chances:
 *   get:
 *     summary: Get a list of all chances
 *     tags: [CHANCE]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of chances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The chance name
 *                   description:
 *                     type: string
 *                     description: The chance name
 *                   industry:
 *                     type: string
 *                     description: The chance name
 *                   role:
 *                     type: string
 *                     description: The chance name
 *                   howToApply:
 *                     type: string
 *                     description: The chance name
 *                   createdAt:
 *                     type: string
 *                     description: The chance name
 *                   lastDateToApply:
 *                     type: string
 *                     description: The chance name
 *
 *             example:
 *
 *                 name: "backend developer"
 *                 description: "node js backend developer "
 *                 industry: "Software"
 *                 role: " backend Developer"
 *                 how to apply: "you can apply by content with chance@gmail.com"
 *                 createdAt: "22 / 1 / 2025"
 *                 lastDateToAplly: "22 / 2 /2025 "
 *       500:
 *         description: Internal server error
 */

// craete chance

/**
 * @swagger
 * /api/v1/chances:
 *   post:
 *     summary: create new chance
 *     security:
 *       - BearerAuth: [] 
 *     tags: [CHANCE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name,description,industry,role,howToApply,lastDateToApply]
 *             properties:
 *               name:
 *                 type: string
 *                 description: chance name 
 *               description:
 *                 type: string
 *                 description: chance description
 *               industry:
 *                 type: string
 *                 description: industry of chance
 *               role:
 *                 type: string
 *                 description: role of chance 
 *               howToApply:
 *                 type: string
 *                 description: way of apply to the chance
 *               lastDateToApply:
 *                 type: string
 *                 description: the last time of applay to chance
 *             
 *             example:
 *               name: "backend "
 *               description: "backend developer with node js "
 *               industry: "software "
 *               role: "back end developer"
 *               howToApply: "you can apply by sent your CV to chance@gmail.com"
 *               lastDateToApply: "22 / 3 / 2025"
 *     responses:
 *       200:
 *         description: chance created succeffully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "chance created"
 *       400:
 *         description: Bad request 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "there are some thing missing "
 *       401:
 *         description: Unauthorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "not authorized to access this route "
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Internal server error"
 *     
 *            
 */


// get single user
/**
 * @swagger
 * /api/v1/chances/{id}:
 *   get:
 *     summary: Get a single chance by ID
 *     tags: [CHANCE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chnace you want to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the chance by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The chane's ID
 *                 name:
 *                   type: string
 *                   description: The chance's name
 *                 description:
 *                   type: string
 *                   description: The chance's description
 *                 industry:
 *                   type: string
 *                   description: The chance's industry
 *                 role:
 *                   type: string
 *                   description: The chance's role
 *                 howToAplly:
 *                   type: string
 *                   description: way to apply to thar chance
 *                 lastDateToApplay:
 *                   type: string
 *                   description: last date to apply to chance
 *             example:
 *               id: "12345"
 *               name: "frontend developer"
 *               decsription: "front end developer with react"
 *               industry: "Software"
 *               role: "Developer"
 *       404:
 *         description: chnace not found (invalid chance ID)
 *       500:
 *         description: Internal server error
 */

// update chance
/**
 * @swagger
 * /api/v1/chances/{id}:
 *   put:
 *     summary: Update chance by ID
 *     security:
 *       - BearerAuth: [] 
 *     tags: [CHANCE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chance to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the chance
 *               decsription:
 *                 type: string
 *                 description: The new description of the chance
 *               industry:
 *                 type: string
 *                 description: The new industry of the chance
 *               role:
 *                 type: string
 *                 description: The new role of the chance
 *               howToApply:
 *                 type: string
 *                 description: The new way to apply to  the chance
 *               lastDateToApply:
 *                 type: string
 *                 description: The new last date of apply to chance
 *               
 *             example:
 *               name: "new chance name "
 *               description: "new chance description"
 *               industry: "new chance industry "
 *               role: "new chance role "
 *               howToAplly: "new way to apply"
 *               lastDateToApply: "new last date "
 *     responses:
 *       200:
 *         description: Successfully updated the chnace
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "chance updated successfully"
 *       400:
 *         description: Bad request (e.g., invalid data)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: chance not found (invalid chance ID)
 *       500:
 *         description: Internal server error
 *     
 */

// delete chance
/**
 * @swagger
 * /api/v1/chances/{id}:
 *   delete:
 *     summary: delete chance by ID
 *     security:
 *       - BearerAuth: [] 
 *     tags: [CHANCE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chance to be updated
 *     responses:
 *       200:
 *         description: Successfully deleted the chnace
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "chance deleted successfully"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: chance not found (invalid chance ID)
 *       500:
 *         description: Internal server error
 *     
 */
