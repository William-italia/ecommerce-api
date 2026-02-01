import { ProductRepository } from './product.repository';
import { Product, CreateProductDTO, UpdateProductDTO } from './product.types';
import { AppError } from '../../shared/errors/AppError';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async listProducts(): Promise<Product[]> {
    return this.repo.getAll();
  }

  async getProduct(id: number): Promise<Product | null> {
    const product = await this.repo.getById(id);
    if (!product) throw new AppError('Produto não existe', 404);

    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    const existing = await this.repo.getByName(data.name);

    if (existing) throw new AppError('Produto Já existe', 409);

    const product = await this.repo.create(data);
    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDTO
  ): Promise<Product | null> {
    const existing = await this.repo.getById(id);

    if (!existing) throw new AppError('Produto não existe', 404);

    const updatedProduct = await this.repo.updateById(id, data);

    return updatedProduct;
  }

  async removeProduct(id: number) {
    const existing = await this.repo.getById(id);

    if (!existing) throw new AppError('Produto não encontrado', 404);

    const product = await this.repo.deleteById(id);

    return product;
  }
}
