import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} from './product.controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', removeProduct);

export default router;
