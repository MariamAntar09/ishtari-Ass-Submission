const { z } = require("zod");

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["available", "out_of_stock"]),
  createdAt: z.string(),
});

const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["available", "out_of_stock"]).default("available"),
});

const UpdateStatusSchema = z.object({
  status: z.enum(["available", "out_of_stock"]),
});

module.exports = {
  ProductSchema,
  CreateProductSchema,
  UpdateStatusSchema,
};