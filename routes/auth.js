const express = require('express');
const {
  register,
  login,
  forgetPassword,
  resetPassword,
} = require('../controllers/auth');
const router = express.Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          user:
 *              type: object
 *              required: true
 *                - name
 *                - email
 *                - industry
 *                - role
 *                - password
 *              properties:
 *                  name:
 *                      type: string
 *                      description: user name
 *                  email:
 *                      type: string
 *                      description: user email
 *                  industry:
 *                      type: string
 *                      description: user work industry
 *                  role:
 *                      type: string
 *                      description: user role in the work
 *                  password:
 *                      type: string
 *                      description: user password
 *              example:
 *                name: osama shaker
 *                email: osamashaker@gmail.com
 *                industry: software
 *                role: backend dev
 *                password: '123456'
 *
 */

/**
 * @swagger
 * tags:
 *  name: AUTH
 *  description: user auth routes
 */
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgetpassword').post(forgetPassword);
router.route('/:email/resetpassword').post(resetPassword);

module.exports = router;


/**
 * @swagger
 * /api/v1/users/auth/register:
 *   post:
 *     summary: Register a new user to the app
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'  # Reference to the user schema
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'  # Return the created user object
 *             example:
 *               id: "12345"
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               industry: "Software"
 *               role: "Developer"
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *       409:
 *         description: Conflict (e.g., user already exists)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/users/auth/login:
 *   post:
 *     tags: [AUTH]
 *     summary: Login a registered user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               email: "osama@gmail.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for subsequent requests
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's unique ID
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                     name:
 *                       type: string
 *                       description: The user's name
 *             example:
 *               token: "your-jwt-token-here"
 *               user:
 *                 id: "12345"
 *                 email: "osama@gmail.com"
 *                 name: "Osama"
 *       401:
 *         description: Unauthorized (incorrect email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/users/auth/forgetpassword:
 *   post:
 *     summary: Request a password reset code
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *             example:
 *               email: "osama@gmail.com"
 *     responses:
 *       200:
 *         description: Email sent with the reset code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [code]
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The reset code sent to the user's email
 *             example:
 *               code: "123456"
 *       400:
 *         description: Bad request (invalid or missing email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid or missing email"
 *       404:
 *         description: User not found (email does not exist)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User with this email does not exist"
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
 */

/**
 * @swagger
 * /api/v1/users/auth/{email}/resetpassword:
 *   post:
 *     summary: Reset the user's password
 *     tags: [AUTH]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user who requested the password reset (the email to which the reset code was sent)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, newPassword]
 *             properties:
 *               code:
 *                 type: string
 *                 description: The reset code sent to the user's email
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *                 minLength: 6  # Optional: specify minimum password length
 *                 example: "newStrongPassword123"
 *             example:
 *               code: "123ero"
 *               newPassword: "newStrongPassword123"
 *     responses:
 *       200:
 *         description: Password successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Password updated successfully"
 *       400:
 *         description: Bad request (invalid code or newPassword)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid reset code or password format"
 *       401:
 *         description: Unauthorized (invalid or expired reset code)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid or expired reset code"
 *       404:
 *         description: User not found (email does not exist)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User with this email does not exist"
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
 */