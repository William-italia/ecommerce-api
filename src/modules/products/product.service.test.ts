import { serialize } from 'node:v8';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.types';
import { mock } from 'node:test';

describe('ProductService', () => {
  let service: ProductService;

  const mockRepo = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(() => {
    service = new ProductService(mockRepo as unknown as ProductRepository);
    jest.clearAllMocks();
  });

  it('Should return all products', async () => {
    const products = [
      { id: 1, name: 'Teste 1' },
      { id: 2, name: 'Teste 2' },
      { id: 3, name: 'Teste 3' },
      { id: 4, name: 'Teste 4' },
    ];

    mockRepo.getAll.mockResolvedValue(products);

    const result = await service.listProducts();

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it('Should return the specific product by ID', async () => {
    const product = { id: 5, name: 'Mouse' };

    mockRepo.getById.mockResolvedValue(product);

    const result = await service.getProduct(5);

    expect(mockRepo.getById).toHaveBeenCalled();
    expect(result).toEqual(product);
  });

  it('Should throw a new error if the ID Does not exist (Get)', async () => {
    await expect(service.getProduct(0)).rejects.toThrow('Id inválido');
  });

  it('Should update the specif procuct by ID', async () => {
    const id = 5;

    const existingProduct = { id: 5, name: 'Mouse', price: 100, stock: 2 };

    const updateProduct = {
      ...existingProduct,
      name: 'Mouse Gamer',
    };
    mockRepo.getById.mockResolvedValue(existingProduct);
    mockRepo.updateById.mockResolvedValue(updateProduct);

    let result = await service.updateProduct(id, updateProduct);

    expect(mockRepo.getById).toHaveBeenCalledWith(id);
    expect(mockRepo.updateById).toHaveBeenCalledWith(id, updateProduct);
    expect(result).toEqual(updateProduct);
  });

  it('id error (errors update)', async () => {
    const procuct = {
      id: 0,
      price: 150,
      stock: 2,
    };

    await expect(service.updateProduct(0, procuct as any)).rejects.toThrow(
      'Id inválido'
    );
  });

  it('id not exist (errors update)', async () => {
    const id = 99;
    const data = {
      price: 150,
      stock: 5,
    };

    mockRepo.getById.mockResolvedValue(null);

    await expect(service.updateProduct(id, data as any)).rejects.toThrow(
      'Produto Não existe'
    );

    expect(mockRepo.getById).toHaveBeenCalledWith(id);
  });

  it('price error (errors update)', async () => {
    const procuct = {
      id: 1,
      price: -150,
      stock: 2,
    };

    await expect(service.updateProduct(1, procuct as any)).rejects.toThrow(
      'Preço Inválido'
    );
  });

  it('stock error (errors update)', async () => {
    const procuct = {
      id: 1,
      price: 150,
      stock: -2,
    };

    await expect(service.updateProduct(1, procuct as any)).rejects.toThrow(
      'Estoque Inválido'
    );
  });

  // CREATE
  it('Testando Create', async () => {
    const data: CreateProductDTO = {
      name: 'Produto Teste',
      description: 'Meu Produto',
      features: 'Mais texto',
      boxItems: [
        { quantidade: 1, item: 'Caixa' },
        { quantidade: 3, item: 'Caixa2' },
      ],
      price: 150,
      stock: 4,
      mainImage: 'url_da_imagem',
      galleryImages: ['url_da_imagem1', 'url_da_imagem2'],
    };

    mockRepo.create.mockResolvedValue(data);
    const result = await service.createProduct(data);

    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(data);
  });

  it('Verifica nome', async () => {
    const data = {
      description: 'Meu Produto',
      features: 'Mais texto',
      boxItems: [
        { quantidade: 1, item: 'Caixa' },
        { quantidade: 3, item: 'Caixa2' },
      ],
      price: 150,
      stock: 4,
      mainImage: 'url_da_imagem',
      galleryImages: ['url_da_imagem1', 'url_da_imagem2'],
    };

    mockRepo.create.mockResolvedValue(data);

    await expect(service.createProduct(data as any)).rejects.toThrow(
      'Nome é Obrigatório'
    );
  });

  it('Verifica se preço existe ou se é negativo', async () => {
    const data = {
      name: 'produto',
      description: 'Meu Produto',
      features: 'Mais texto',
      boxItems: [
        { quantidade: 1, item: 'Caixa' },
        { quantidade: 3, item: 'Caixa2' },
      ],
      price: -10,
      stock: 4,
      mainImage: 'url_da_imagem',
      galleryImages: ['url_da_imagem1', 'url_da_imagem2'],
    };

    mockRepo.create.mockResolvedValue(data);

    await expect(service.createProduct(data)).rejects.toThrow('Preço Inválido');
  });

  it('Verifica se stock existe ou se é negativo', async () => {
    const data = {
      name: 'produto',
      description: 'Meu Produto',
      features: 'Mais texto',
      boxItems: [
        { quantidade: 1, item: 'Caixa' },
        { quantidade: 3, item: 'Caixa2' },
      ],
      price: 10,
      stock: -4,
      mainImage: 'url_da_imagem',
      galleryImages: ['url_da_imagem1', 'url_da_imagem2'],
    };

    mockRepo.create.mockResolvedValue(data);

    await expect(service.createProduct(data)).rejects.toThrow(
      'Estoque Inválido'
    );
  });

  // REMOVE
  it('remove o produto', async () => {
    const id = 1;
    const product = {
      id,
      price: 100,
      stock: 3,
    };

    mockRepo.deleteById.mockResolvedValue(product);

    const result = await service.removeProduct(id);

    expect(mockRepo.deleteById).toHaveBeenCalledWith(id);
    expect(result).toEqual(product);
  });
});
