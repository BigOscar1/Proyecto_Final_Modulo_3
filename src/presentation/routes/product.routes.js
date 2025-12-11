const { Router } = require('express');
const ProductController = require('../controller/product.controller');
// const authenticateToken = require('../middlewares/auth.middleware');
// const isAdmin = require('../middlewares/admin.middleware');

// Esta es la "Inyección de Dependencias" manual
const ProductService = require('../../application/use-cases/product.service');

const ProductMongoRepository = require('../../infrastructure/repositories/database/mongo/product.mongo.repository');
const productRepository = new ProductMongoRepository();

const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a list of Products
 *     responses:
 *       200:
 *         description: A list of Products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a single product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: product not found
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /Products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Product with this name already exists
 */
router.post('/', productController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
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
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put('/:id', productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Product not found
 */
router.delete('/:id', productController.delete);

module.exports = router;