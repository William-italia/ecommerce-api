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
    return this.repo.getAllProducts();
  }

  async listProductsByCategory(
    category: string
  ): Promise<CategoryProductDTO[] | null> {
    const products = await this.repo.getProductsByCategory(category);

    if (!products)
      throw new AppError(
        `Não há nenhum produto nesta categoria ${category}`,
        404
      );

    return products;
  }

  async listRecommendedProducts(
    id: number,
    limit: number
  ): Promise<RecommendedProductDTO[] | null> {
    const products = await this.repo.getRecommendedProducts(id, limit);

    if (!products)
      throw new AppError(`Não há nenhum produto recomendado!`, 404);

    return products;
  }

  async getProduct(id: number): Promise<ProductDTO> {
    const product = await this.repo.getProductById(id);

    if (!product) throw new AppError('Produto não existe', 404);

    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<ProductDTO> {
    if (await this.repo.existsByName(data.name)) {
      throw new AppError('Produto Já existe', 409);
    }

    const product = await this.repo.createProduct(data);
    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    // pensar mais
    const existing = await this.repo.getProductById(id);

    if (!existing) throw new AppError('Produto não existe', 404);

    const updatedProduct = await this.repo.updateProductById(id, data);

    return updatedProduct;
  }

  async removeProduct(id: number) {
    const existing = await this.repo.getProductById(id);

    if (!existing) throw new AppError('Produto não encontrado', 404);

    const product = await this.repo.deleteProductById(id);

    return product;
  }
}
