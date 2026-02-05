import { ProductRepository } from './product.repository';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './product.types';
import { AppError } from '../../shared/errors/AppError';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async listProducts(): Promise<ProductDTO[]> {
    return this.repo.getAll();
  }

  async listProductsByCategory(category: string): Promise<ProductDTO[] | null> {
    const products = await this.repo.getByCategory(category);

    if (!products)
      throw new AppError(
        `Não há nenhum produto nesta categoria ${category}`,
        404
      );

    return products;
  }

  async listRecommended(
    id: number,
    limit: number
  ): Promise<ProductDTO[] | null> {
    const products = await this.repo.getRecommended(id, limit);

    if (!products)
      throw new AppError(`Não há nenhum produto recomendado!`, 404);

    return products;
  }

  async getProduct(id: number): Promise<ProductDTO> {
    const product = await this.repo.getById(id);

    if (!product) throw new AppError('Produto não existe', 404);

    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<ProductDTO> {
    let existing = await this.repo.getByName(data.name);

    if (existing) throw new AppError('Produto Já existe', 409);

    const product = await this.repo.create(data);
    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDTO
  ): Promise<ProductDTO | null> {
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
