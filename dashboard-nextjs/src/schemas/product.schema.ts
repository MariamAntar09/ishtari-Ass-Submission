import { z } from "zod";

// Base Product Schema
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active","inactive", "out_of_stock"]),
  createdAt: z.string(),
});

// List of Products Schema (Array of ProductSchema)
export const ProductListSchema = z.object({
    data: z.array(ProductSchema),
});

// Schema for Creating a Product
export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active","inactive", "out_of_stock"]).default("active"),
});

// Schema for Updating Product Status
export const UpdateStatusSchema = z.object({
  status: z.enum(["active","inactive", "out_of_stock"]),
});

// Export TypeScript Types inferred from Zod schemas
export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;