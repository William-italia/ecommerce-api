import express from 'express';
import { CartItemRepository } from './cartItem.repository';
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../products/product.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
const router = express.Router();

const cartRepository = new CartRepository();
const cartItemRepository = new CartItemRepository();
const productRepository = new ProductRepository();
const cartService = new CartService(
  cartRepository,
  cartItemRepository,
  productRepository
);

const cartController = new CartController(cartService);

router.get('/:id', cartController.getCart);
router.get('', get);
router.post('', create);
router.put('', update);
router.delete('', remove);

export default router;
