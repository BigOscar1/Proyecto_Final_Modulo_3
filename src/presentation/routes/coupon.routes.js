const { Router } = require("express");
const CouponController = require("../controller/coupon.controller");

// Inyección de Dependencias manual
const CouponService = require("../../application/use-cases/coupon.service");
const CouponMongoRepository = require("../../infrastructure/repositories/database/mongo/coupon.mongo.repository");

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const router = Router();

/**
 * @swagger
 * /coupons:
 *   get:
 *     tags:
 *       - Coupons
 *     summary: Retrieve a list of Coupons
 *     responses:
 *       200:
 *         description: A list of Coupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get("/", couponController.getAll);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     tags:
 *       - Coupons
 *     summary: Retrieve a single coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: coupon not found
 */
router.get("/:id", couponController.getById);

/**
 * @swagger
 * /coupons/code/{code}:
 *   get:
 *     tags:
 *       - Coupons
 *     summary: Retrieve a single coupon by CODE
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: coupon not found
 */
router.get("/code/:code", couponController.getByCode);

/**
 * @swagger
 * /Coupons:
 *   post:
 *     tags:
 *       - Coupons
 *     summary: Create a new coupon
 *     description: Requires authentication token and role *admin*
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       201:
 *         description: The created coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       401:
 *        description: No token provided, authorization denied
 *       403:
 *        description: Access denied. Admin role required.
 *       409:
 *         description: Coupon with this code already exists
 */
router.post("/", couponController.create);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     tags:
 *       - Coupons
 *     summary: Update a coupon
*     description: Requires authentication token and role *admin*
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       200:
 *         description: The updated coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       401:
 *        description: No token provided, authorization denied
 *       403:
 *        description: Access denied. Admin role required.
 *       404:
 *         description: Coupon not found
 *       409:
 *         description: Coupon with this code already exists
 */

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     tags:
 *       - Coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       400:
 *         description: Bad request
 *       401:
 *        description: No token provided, authorization denied
 *       403:
 *        description: Access denied. Admin role required.
 *       404:
 *         description: Coupon not found
 */
router.delete("/:id", couponController.delete);

module.exports = router;
