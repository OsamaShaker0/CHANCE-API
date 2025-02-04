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

/**
 * @swagger
 *  /api/v1/users/auth/register:
 *    post:
 *      summary: register new user to the app
 *      tags : [AUTH]
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *      responses:
 *        201:
 *          description: user is created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/user'
 *
 */

router.route('/register').post(register);

/**
 * @swagger
 * /api/v1/users/auth/login:
 *  post:
 *    tags: [AUTH]
 *    summary: login user that is register before
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [email , password]
 *            properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *            example:
 *              email: osama@gmail.com
 *              password: '123456'
 *    responses:
 *      200:
 *        description: user is login
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                required: [email , password]
 *                properties:
 *                 email:
 *                  type: string
 *                 password:
 *                  type: string
 *
 *
 */
router.route('/login').post(login);
/**
 * @swagger
 * /api/v1/users/auth/forgetpassword:
 *  post:
 *    summary: get code to reset password
 *    tags: [AUTH]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [email]
 *            properties:
 *               email:
 *                  type: string
 *                  description: user email
 *            example:
 *              email: osama@gamil.com
 *    responses:
 *      200:
 *          description: email sent!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required: [code]
 *                properties:
 *                  code:
 *                    type: string
 *                    description: code
 *
 */
router.route('/forgetpassword').post(forgetPassword);
/**
 * @swagger
 * /api/v1/users/auth/{email}/resetpassword:
 *  post:
 *    summary: reset the password
 *    tags: [AUTH]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *          required: true
 *          description: user email that has reset code
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [code , newPassword]
 *            properties:
 *               code:
 *                  type: string
 *                  description: code sent to user
 *               newPassword:
 *                  type: string
 *                  description: user new password
 *
 *            example:
 *              code: '123ero'
 *              newPassword: '1234567'
 *    responses:
 *      200:
 *          description: password updated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *
 *
 *
 */
router.route('/:email/resetpassword').post(resetPassword);

module.exports = router;
