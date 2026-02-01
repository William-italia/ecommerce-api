export interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  box_items: BoxItem[];
  price: number;
  stock: number;
  main_image: string;
  gallery_images: string[];
  category: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  features: string[];
  box_items: BoxItem[];
  price: number;
  stock: number;
  main_image: string;
  gallery_images: GalleryImages;
  category: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  features?: string[];
  box_items?: BoxItem[];
  price?: number;
  stock?: number;
  main_image?: string;
  gallery_images?: GalleryImages;
  category?: string;
}

export interface BoxItem {
  quantidade: number;
  item: string;
}

export type GalleryImages = string[];
