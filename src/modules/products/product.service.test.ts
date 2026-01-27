import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

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

  // ================= LIST =================
  describe('List products', () => {
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
  });

  // ================= GET =================
  describe('Get product', () => {
    it('Should return a specific product by ID', async () => {
      const product = { id: 5, name: 'Mouse' };

      mockRepo.getById.mockResolvedValue(product);

      const result = await service.getProduct(5);

      expect(mockRepo.getById).toHaveBeenCalled();
      expect(result).toEqual(product);
    });

    it('Should throw an error if ID is invalid (get)', async () => {
      await expect(service.getProduct(0)).rejects.toThrow('Id inválido');
    });
  });

  // ================= UPDATE =================
  describe('Update product', () => {
    it('Should update a product by ID', async () => {
      const id = 5;

      const existingProduct = { id: 5, name: 'Mouse', price: 100, stock: 2 };

      const updateProduct = {
        ...existingProduct,
        name: 'Mouse Gamer',
      };

      mockRepo.getById.mockResolvedValue(existingProduct);
      mockRepo.updateById.mockResolvedValue(updateProduct);

      const result = await service.updateProduct(id, updateProduct);

      expect(mockRepo.getById).toHaveBeenCalledWith(id);
      expect(mockRepo.updateById).toHaveBeenCalledWith(id, updateProduct);
      expect(result).toEqual(updateProduct);
    });

    it('Should throw error when updating with invalid ID', async () => {
      const product = {
        id: 0,
        price: 150,
        stock: 2,
      };

      await expect(service.updateProduct(0, product as any)).rejects.toThrow(
        'Id inválido'
      );
    });

    it('Should throw error when product does not exist on update', async () => {
      const id = 99;
      const data = {
        price: 150,
        stock: 5,
      };

      mockRepo.getById.mockResolvedValue(null);

      await expect(service.updateProduct(id, data as any)).rejects.toThrow(
        'Produto não existe'
      );

      expect(mockRepo.getById).toHaveBeenCalledWith(id);
    });

    it('Should throw error when price is invalid on update', async () => {
      const product = {
        id: 1,
        price: -150,
        stock: 2,
      };

      await expect(service.updateProduct(1, product as any)).rejects.toThrow(
        'Preço Inválido'
      );
    });

    it('Should throw error when stock is invalid on update', async () => {
      const product = {
        id: 1,
        price: 150,
        stock: -2,
      };

      await expect(service.updateProduct(1, product as any)).rejects.toThrow(
        'Estoque Inválido'
      );
    });
  });

  // ================= CREATE =================
  describe('Create product', () => {
    it('Should create a new product', async () => {
      const data = {
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

    it('Should throw error when name is missing on create', async () => {
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

    it('Should throw error when price is invalid on create', async () => {
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

      await expect(service.createProduct(data)).rejects.toThrow(
        'Preço Inválido'
      );
    });

    it('Should throw error when stock is invalid on create', async () => {
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
  });

  // ================= REMOVE =================
  describe('Remove product', () => {
    it('Should remove a product by ID', async () => {
      const id = 4;
      const existingProduct = { id: 4, name: 'Mouse', price: 100, stock: 2 };

      mockRepo.getById.mockResolvedValue(existingProduct);
      mockRepo.deleteById.mockResolvedValue(existingProduct);

      const result = await service.removeProduct(id);

      expect(mockRepo.getById).toHaveBeenCalledWith(id);
      expect(mockRepo.deleteById).toHaveBeenCalledWith(id);
      expect(result).toEqual(existingProduct);
    });

    it('Should throw error when ID is invalid on remove', async () => {
      const id = -99;

      expect(service.removeProduct(id)).rejects.toThrow('Id inválido');
    });

    it('Should throw error when product does not exist on remove', async () => {
      const id = 1;

      mockRepo.getById.mockResolvedValue(null);

      await expect(service.removeProduct(id)).rejects.toThrow(
        'Produto não existe'
      );

      expect(mockRepo.getById).toHaveBeenCalledWith(id);
    });
  });
});
