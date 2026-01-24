export interface Product {
  id: number;
  name: string;
  description: string;
  features: string;
  boxItems: JSON;
  price: number;
  stock: number;
  mainImage: string;
  galleryImages: string[];
}

export interface CreateProductDTO {
  name: string;
  description: string;
  features: string;
  boxItems: BoxItem[]; // array de items da caixa
  price: number;
  stock: number;
  mainImage: string; // url da imagem principal
  galleryImages: GalleryImages; // array para urls das imagens
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  features?: string;
  boxItems?: BoxItem[]; // array de items da caixa
  price?: number;
  stock?: number;
  mainImage?: string; // url da imagem principal
  galleryImages?: GalleryImages; // array para urls das imagens
}

export interface BoxItem {
  quantidade: number;
  item: string;
}

export type GalleryImages = string[];
