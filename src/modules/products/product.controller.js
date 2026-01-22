import Product from './product.model';

const getProducts = async (req, res) => {
  try {
    const result = await Product.findAll();
  } catch (error) {}
};

const getProduct = async (req, res) => {
  try {
  } catch (error) {}
};

const createProduct = async (req, res) => {
  try {
  } catch (error) {}
};

const updateProduct = async (req, res) => {
  try {
  } catch (error) {}
};

const removeProduct = async (req, res) => {
  try {
  } catch (error) {}
};

export { getProduct, getProducts, createProduct, updateProduct, removeProduct };
