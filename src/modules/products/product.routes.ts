import express from 'express';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { productExist } from './middlewares/productsExists';

const router = express.Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get('/', productController.getProducts);
router.get('/recommended', productController.getRecommended);
router.get('/category/:category', productController.getProductByCategory);
router.get('/:id', productExist, productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productExist, productController.updateProduct);
router.delete('/:id', productExist, productController.removeProduct);

export default router;
