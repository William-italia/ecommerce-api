import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { handleError } from '../../shared/errors/handleError';
import { sendResponse } from '../../shared/utils/sendResponse';

export class CartController {
  constructor(private service: CartService) {}

  async getCart(req: Request, res: Response) {
    try {
      const { token } = req.cookies?.cart_token;

      const cart = await this.service.getCartWithItems(token);

      return res.status(200).json(cart);
    } catch (error: unknown) {}
  }

  async addItem(req: Request, res: Response) {
    try {
      const token = req.cookies?.cart_token;

      const { item, newToken } = await this.service.addCart(req.body, token);

      if (newToken) {
        res.cookie('cart_token', newToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }

      return res.status(201).json(item);
    } catch (error: unknown) {
      return handleError(res, error);
    }
  }
}
