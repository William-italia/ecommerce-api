import { CartDTO, CreateCartDTO } from "./cart.types";

export interface ICartRepository {
  findByToken(token: string): Promise<CartDTO | null>;
  findAll(): Promise<CartDTO[]>;
  createCart(data: CreateCartDTO): Promise<CartDTO>;
}
