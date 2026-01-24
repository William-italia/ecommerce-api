import { CreateProductDTO, UpdateProductDTO } from '../product.types.js';

export function validateCreateProduct(data: CreateProductDTO) {
  if (!data.name) throw new Error('Nome é Obrigatório');
  if (!data.price || data.price < 0) throw new Error('Preço Inválido');
  if (!data.stock || data.stock < 0) throw new Error('Estoque Inválido');
}

export function validateUpdateProduct(id: number, data: UpdateProductDTO) {
  if (id <= 0) throw new Error('Id inválido');
  if (!data.price || data.price < 0) throw new Error('Preço Inválido');
  if (!data.stock || data.stock < 0) throw new Error('Estoque Inválido');
}
