const express = require('express');
const {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfilePhoto,

  updatePassword,
  savedChances,
  getSavedChances,
} = require('../controllers/user');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getUsers); //1
router.route('/savedchances').get(protect, getSavedChances); //7
router.route('/updatepassword').put(protect, updatePassword); //4
router.route('/savechance').put(protect, savedChances);
router
  .route('/:id')
  .get(getSingleUser) //2
  .put(protect, authorize('admin', 'user', 'publisher'), updateUser) // 3
  .delete(protect, authorize('admin', 'user', 'publisher'), deleteUser); //5

router
  .route('/:id/uploadphoto')
  .put(protect, authorize('admin', 'user', 'publisher'), uploadProfilePhoto);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: USER
 *  description: user auth routes
 */
// get all users
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   
 *                   industry:
 *                     type: string
 *                     description: The user's industry
 *                   role:
 *                     type: string
 *                     description: The user's role
 *             example:
 *               - id: "12345"
 *                 name: "John Doe"
 *               
 *                 industry: "Software"
 *                 role: "Developer"
 *               - id: "67890"
 *                 name: "Jane Smith"
 *                 email: "jane.smith@example.com"
 *                 industry: "Marketing"
 *                 role: "Manager"
 *       500:
 *         description: Internal server error
 */

// get single user
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user you want to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the user by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 industry:
 *                   type: string
 *                   description: The user's industry
 *                 role:
 *                   type: string
 *                   description: The user's role
 *             example:
 *               id: "12345"
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               industry: "Software"
 *               role: "Developer"
 *       404:
 *         description: User not found (invalid user ID)
 *       500:
 *         description: Internal server error
 */

// update user
/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     security:
 *       - BearerAuth: [] 
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name  # Assuming name is required to update user
 *               - email # Assuming email is required for user update
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user
 *               email:
 *                 type: string
 *                 description: The new email of the user
 *               industry:
 *                 type: string
 *                 description: The new industry of the user
 *               role:
 *                 type: string
 *                 description: The new role of the user
 *             example:
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               industry: "Technology"
 *               role: "Software Developer"
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User updated successfully"
 *       400:
 *         description: Bad request (e.g., invalid data)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: User not found (invalid user ID)
 *       500:
 *         description: Internal server error
 *     
 */

// update password

/**
 * @swagger
 * /api/v1/users/updatepassword:
 *   put:
 *     summary: Update the user's password
 *     security:
 *       - BearerAuth: []
 *     description: This endpoint allows the user to change their password. The user must provide their current password and a new password. The current password must be valid, and the new password must meet security requirements, including length and complexity.
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password. Must match the existing password for the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password to set for the user. Must be at least 8 characters long and contain a mix of letters and numbers.
 *             example:
 *               currentPassword: "123456"
 *               newPassword: "NewPassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message of the successful password update.
 *               example:
 *                 msg: "Your password has been successfully updated."
 *       400:
 *         description: Bad request, possibly due to an incorrect current password or a weak new password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing why the password update failed.
 *               example:
 *                 error: "The current password is incorrect."
 *       401:
 *         description: Unauthorized access, user not authenticated or token expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for unauthenticated access.
 *               example:
 *                 error: "Authentication failed. Please log in again."
 *       422:
 *         description: Unprocessable entity, possibly due to a weak password or invalid password format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detailed error message explaining why the password could not be updated.
 *               example:
 *                 error: "The new password does not meet the required strength criteria."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: General error message when an unexpected server error occurs.
 *               example:
 *                 error: "An unexpected error occurred. Please try again later."
 */

// delete user
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     security:
 *       - BearerAuth: [] 
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User deleted successfully"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     
 */

// saved chances
/**
 * @swagger
 * /api/v1/users/savedchances:
 *   get:
 *     summary: Get all saved chances for the authenticated user
 *     security:
 *       - BearerAuth: [] 
 *     description: This endpoint allows the user to retrieve a list of all the chances they have saved. The response includes a list of saved chance identifiers or objects, depending on the system.
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of saved chances.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chances:
 *                   type: array
 *                   description: An array of saved chances.
 *                   items:
 *                     type: string
 *                   example:
 *                     - "chance1"
 *                     - "chance2"
 *       401:
 *         description: Unauthorized access (invalid or missing token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed. Please provide a valid token."
 *       404:
 *         description: No saved chances found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No saved chances found for this user."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 *    
 */

//save chance
/**
 * @swagger
 * /api/v1/users/savechance:
 *   put:
 *     summary: Save a chance to the user's saved chances
 *     security:
 *       - BearerAuth: [] 
 *     description: This endpoint allows the authenticated user to save a specific chance using its ID. Once saved, the chance can be retrieved later from the saved chances list.
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chanceId
 *             properties:
 *               chanceId:
 *                 type: string
 *                 description: The ID of the chance that the user wants to save.
 *             example:
 *               chanceId: "8675848399374"
 *     responses:
 *       200:
 *         description: Successfully added the chance to the saved chances list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message confirming the chance was saved.
 *               example:
 *                 msg: "The chance has been successfully added to your saved chances."
 *       400:
 *         description: Bad request, likely due to missing or invalid `chanceId`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing chanceId."
 *       401:
 *         description: Unauthorized (invalid or missing token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed. Please provide a valid token."
 *       404:
 *         description: Chance not found (if the provided `chanceId` doesn't exist).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Chance not found with the provided ID."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 *     
 */
