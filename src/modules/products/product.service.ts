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

    if (products.length === 0)
      throw AppError.notFound(
        'Não há nenhum produto nesta categoria: ' + category
      );

    return products;
  }

  async listRecommendedProducts(
    id: number,
    limit: number
  ): Promise<RecommendedProductDTO[] | null> {
    const products = await this.repo.getRecommendedProducts(id, limit);

    if (products.length === 0)
      throw AppError.notFound('Não foi possivel encontrar nenhum produto');

    return products;
  }

  async getProduct(id: number): Promise<ProductDTO> {
    const product = await this.repo.getProductById(id);

    if (!product) throw AppError.notFound('Produto não encontrado');

    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<ProductDTO> {
    if (await this.repo.existsByName(data.name)) {
      throw AppError.conflict('Já existe um produto com esse nome');
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

    if (!existing) throw AppError.notFound('Produto não encontrado');

    const updatedProduct = await this.repo.updateProductById(id, data);

    return updatedProduct;
  }

  async removeProduct(id: number) {
    const existing = await this.repo.getProductById(id);

    if (!existing) throw AppError.notFound('Produto não encontrado');

    const product = await this.repo.deleteProductById(id);

    return product;
  }
}
