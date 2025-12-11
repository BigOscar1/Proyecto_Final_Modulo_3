const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const asyncHandler = require('../utils/async.handler');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate a user and return a token
 *     description: Validates user credentials and returns an authentication token if successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthInput'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Internal server error
 */

router.post('/login', asyncHandler(authController.login));

module.exports = router;