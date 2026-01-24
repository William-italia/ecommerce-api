import { Product } from '../../modules/products/product.types.js';

export function parseProductJSON(product: Product): Product {
  product.boxItems = JSON.parse(product.boxItems as any);
  product.galleryImages = JSON.parse(product.galleryImages as any);

  return product;
}
