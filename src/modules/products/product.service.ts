import { ProductRepository } from './product.repository';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
  RecommendedProductDTO,
  CategoryProductDTO,
} from './product.types';
import { AppError } from '../../shared/errors/AppError';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async listProducts(): Promise<ProductDTO[]> {
    return this.repo.findAll();
  }

  async getProductById(id: number): Promise<ProductDTO> {
    const product = await this.repo.findById(id);

    if (!product) throw AppError.notFound('Produto não encontrado');

    return product;
  }

  async getProductsByCategory(category: string): Promise<CategoryProductDTO[]> {
    const products = await this.repo.findByCategory(category);

    if (products.length === 0) return [];

    return products;
  }

  async getRecommendedProducts(
    currentProductId: number,
    limit = 3
  ): Promise<RecommendedProductDTO[]> {
    if (limit <= 0 || limit >= 20) throw AppError.badRequest('Limite inválido');

    if (currentProductId) {
      const product = await this.repo.findById(currentProductId);

      if (!product) throw AppError.notFound('Produto não encontrado');
    }

    const products = await this.repo.findRecommended(currentProductId, limit);

    if (products.length === 0) return [];

    return products;
  }

  async createProduct(data: CreateProductDTO): Promise<ProductDTO> {
    if (await this.repo.findByName(data.name)) {
      throw AppError.conflict('Já existe um produto com esse nome');
    }

    const product = await this.repo.create(data);
    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    if (data.name !== undefined) {
      const exists = await this.repo.existsByName(data.name, id);

      if (exists) {
        throw AppError.conflict('Nome já existe na base de dados!');
      }
    }

    const updated = await this.repo.update(id, data);

    if (!updated) throw AppError.notFound('Produto não encontrado');

    return updated;
  }

  async deleteProduct(id: number) {
    const deleted = await this.repo.delete(id);

    if (!deleted) throw AppError.notFound('Produto não encontrado');

    return deleted;
  }
}
