const productService = require("../services/product.service");
const { CreateProductSchema, UpdateStatusSchema } = require("../schemas/product.schema");

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
    const validatedData = CreateProductSchema.parse(req.body);
    const newProduct = await productService.createNewProduct(validatedData);

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
}

async function updateProductStatus(req, res, next) {
  try {
    const validatedData = UpdateStatusSchema.parse(req.body);
    const updatedProduct = await productService.changeProductStatus(
      req.params.id,
      validatedData.status
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