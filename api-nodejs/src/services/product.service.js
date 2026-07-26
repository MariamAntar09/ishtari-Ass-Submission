const productModel = require("../models/product.model");

async function getAllProducts() {
  return await productModel.findAll();
}

async function getProductById(id) {
  const product = await productModel.findById(id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
}

async function createNewProduct(productData) {
  return await productModel.create(productData);
}

async function changeProductStatus(id, newStatus) {
  const updatedProduct = await productModel.updateStatus(id, newStatus);
  if (!updatedProduct) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return updatedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  changeProductStatus,
};