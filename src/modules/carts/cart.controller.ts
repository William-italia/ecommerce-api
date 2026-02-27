import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { handleError } from '../../shared/errors/handleError';
import { sendResponse } from '../../shared/utils/sendResponse';

export class CartController {
  constructor(private service: CartService) {}

  createCart = async (req: Request, res: Response) => {
    try {
      const cart = await this.service.createCart();

      res.cookie('cartToken', cart.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(201).json(cart);
    } catch (error: unknown) {
      handleError(res, error);
    }
  };

  getCart = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.cartToken;

      const cart = await this.service.getCart(token);

      return res.status(200).json(cart);
    } catch (error: unknown) {
      handleError(res, error);
    }
  };

  addItem = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.cartToken;

      const { item, newToken } = await this.service.addCart(req.body, token);

      if (newToken) {
        res.cookie('cartToken', newToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }

      return res.status(201).json(item);
    } catch (error: unknown) {
      handleError(res, error);
    }
  };
}
