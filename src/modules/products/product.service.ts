import { ProductRepository } from './product.repository';
import { Product, CreateProductDTO, UpdateProductDTO } from './product.types';
import {
  validateUpdateProduct,
  validateCreateProduct,
} from './validators/product.validator';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.repo.getAll();
  }

  async getByID(id: number): Promise<Product | null> {
    if (id <= 0) throw new Error('Id inválido');

    const product = await this.repo.getById(id);

    return product;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    validateCreateProduct(data);

    const product = await this.repo.create(data);
    return product;
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product | null> {
    validateUpdateProduct(id, data);

    const existing = await this.repo.getById(id);

    if (!existing) return null;

    const updateProduct = await this.repo.updateById(id, data);

    return updateProduct;
  }

  async remove(id: number): Promise<Product | null> {
    if (id <= 0) throw new Error('Id inválido');

    const product = await this.repo.deleteById(id);
    return product;
  }
}
