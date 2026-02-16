import {
  ProductDTO,
  RecommendedProductDTO,
  CategoryProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './product.types';

export interface IProductRepository {
  findAll(): Promise<ProductDTO[]>;
  findById(id: number): Promise<ProductDTO | null>;
  findByCategory(category: string): Promise<CategoryProductDTO[]>;
  findRecommended(
    exclude: number,
    limit: number
  ): Promise<RecommendedProductDTO[]>;
  findByName(name: string): Promise<boolean>;
  create(data: CreateProductDTO): Promise<ProductDTO>;
  update(id: number, data: UpdateProductDTO): Promise<ProductDTO | null>;
  delete(id: number): Promise<ProductDTO | null>;
  existsByName(name: string, excludeId?: number): Promise<boolean>;
}
