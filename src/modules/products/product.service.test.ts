import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.types';

const mockRepo = {
  create: jest.fn(), // função fake que podemos controlar
  getById: jest.fn(),
  updateById: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    //cria a instância do service usando o mock
    service = new ProductService(mockRepo as unknown as ProductRepository);
    jest.clearAllMocks();
  });

  it('Testando criar um produto no repositorio', async () => {
    const data = {
      name: 'Produto Teste',
      description: 'Descrição',
      features: 'Features',
      boxItems: [
        { quantidade: 1, item: 'Caixa' },
        { quantidade: 4, item: 'Fone' },
      ],
      price: 50,
      stock: 10,
      mainImage: 'url_da_imagem',
      galleryImages: ['url1', 'url2'],
    };

    mockRepo.create.mockResolvedValue({ ...data, id: 1 });

    const result = await service.create(data);

    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(result.id).toBe(1);
  });

  it('Testando pegar um produto', async () => {
    const id = 1;
    const data = {
      name: 'Mouse atualizado',
      price: 150,
      stock: 10,
    };

    const existingProduct = {
      id,
      name: 'Mouse',
      price: 10,
      stock: 1,
    };

    const updateProduct = {
      ...existingProduct,
      ...data,
    };

    mockRepo.getById.mockResolvedValue(existingProduct);
    mockRepo.updateById.mockResolvedValue(updateProduct);

    const result = await service.update(id, data as any);

    expect(mockRepo.getById).toHaveBeenCalledWith(id);
    expect(mockRepo.updateById).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(updateProduct);
  });
});
