import {
  ProductDTO,
  RecommendedProductDTO,
  CategoryProductDTO,
} from './product.types';

export class ProductMapper {
  static toProductDTO(row: any): ProductDTO {
    return {
      id: Number(row.id),
      name: row.name,
      description: row.description,
      features:
        typeof row.features === 'string'
          ? JSON.parse(row.features)
          : row.features,
      box_items: row.box_items,
      price: Number(row.price),
      stock: Number(row.stock),
      main_image: row.main_image,
      gallery_images: row.gallery_images,
      category: row.category,
    };
  }

  static toProductDTOList(rows: any[]): ProductDTO[] {
    return rows.map(this.toProductDTO);
  }

  static toRecommendDTO(row: any): RecommendedProductDTO {
    return {
      id: Number(row.id),
      name: row.name,
    };
  }

  static toRecommendedDTOList(rows: any[]): RecommendedProductDTO[] {
    return rows.map(this.toRecommendDTO);
  }

  static toCategoryDTO(row: any): CategoryProductDTO {
    return {
      id: Number(row.id),
      name: row.name,
      description: row.description,
      main_image: row.main_image,
    };
  }

  static toCategoryDTOList(rows: any[]): CategoryProductDTO[] {
    return rows.map(this.toCategoryDTO);
  }
}
