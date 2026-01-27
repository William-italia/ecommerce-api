import { ProductRepository } from './product.repository';
import { Product, CreateProductDTO, UpdateProductDTO } from './product.types';
import {
  validateUpdateProduct,
  validateCreateProduct,
} from './validators/product.validator';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async listProducts(): Promise<Product[]> {
    return this.repo.getAll();
  }

  async getProduct(id: number): Promise<Product | null> {
    if (id <= 0) throw new Error('Id inválido');

    const product = await this.repo.getById(id);

    if (!product) throw new Error('Produto não existe');

    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    validateCreateProduct(data);

    const product = await this.repo.create(data);
    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDTO
  ): Promise<Product | null> {
    validateUpdateProduct(id, data);

    const existing = await this.repo.getById(id);

    if (!existing) throw new Error('Produto não existe');

    const updateProduct = await this.repo.updateById(id, data);

    return updateProduct;
  }

  async removeProduct(id: number): Promise<Product | null> {
    if (id <= 0) throw new Error('Id inválido');

    const existing = await this.repo.getById(id);
    if (!existing) throw new Error('Produto não existe');

    const product = await this.repo.deleteById(id);

    return product;
  }
}
