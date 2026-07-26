const productService = require("../services/product.service");

async function getProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const newProduct = await productService.createNewProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
}

async function updateProductStatus(req, res, next) {
  try {
    const updatedProduct = await productService.changeProductStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductStatus,
};