import express from 'express'
import { getBalance, getProfile, login, registration, updateProfile, updateProfileImage } from '../controllers/membershipController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import { checkEmailAndPasswordExists, checkFirstAndLastNameExists, validateEmailAndPassword } from '../middleware/membershipMiddleware.js'

import {checkFileIsImage} from '../middleware/fileUploadMiddleware.js'

const routes = express.Router()

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Create new user 
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      password:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
 *                      first_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
 *                      last_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.post("/registration",validateEmailAndPassword,registration)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      password:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.post("/login",checkEmailAndPasswordExists,login)

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Profile
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.get("/profile",verifyToken,getProfile)

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Profile Update
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      first_name:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      last_name:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.put("/profile/update",verifyToken,checkFirstAndLastNameExists,updateProfile)

/**
 * @swagger
 * /profile/image:
 *   put:
 *     summary: Profile Image
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.put("/profile/image",verifyToken, checkFileIsImage,updateProfileImage)


/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get Balance
 *     tags:
 *        - 3. Module Transaction
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.get("/balance",verifyToken,getBalance)


export default routes