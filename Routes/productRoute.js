const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');

router.post('/insert',joiSchemaValidation.validateBody(productSchema.insert),  productController.insertProduct);

router.get('/:id',  productController.fetchProductById);
router.get('/',  productController.fetchAllProduct);

router.patch('/:id',joiSchemaValidation.validateBody(productSchema.pdt_update),  productController.updateProduct);

router.delete('/:id',  productController.deleteProduct);

router.post('/details/insert',joiSchemaValidation.validateBody(productSchema.category_insert),  productController.insertProductDetails);


router.get('/view/info',  productController.fetchTotalInfo);

module.exports = router;
