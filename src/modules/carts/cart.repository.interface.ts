import { CartDTO } from './cart.types';

export interface ICartRepository {
  findByToken(token: string): Promise<CartDTO | null>;
  findAll(): Promise<CartDTO[]>;
}
