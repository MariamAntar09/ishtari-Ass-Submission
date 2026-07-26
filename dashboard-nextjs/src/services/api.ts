import {
  ProductSchema,
  ProductListSchema,
  CreateProductSchema,
  UpdateStatusSchema,
  type Product,
  type ProductList,
  type CreateProductInput,
  type UpdateStatusInput,
} from "../schemas/product.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/products
export async function fetchProducts(token?: string): Promise<ProductList> {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (res.status === 401) {
    throw new Error("Unauthorized: Invalid or missing token.");
  }

  if (res.status === 403) {
    throw new Error("Forbidden: Access denied.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return ProductListSchema.parse(data);
}

// GET /api/products/:id
export async function fetchProductById(id: string, token?: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (res.status === 401) {
    throw new Error("Unauthorized: Invalid or missing token.");
  }

  if (res.status === 403) {
    throw new Error("Forbidden: Access denied.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return ProductSchema.parse(data);
}

// POST /api/products
export async function createProduct(
  input: CreateProductInput,
  token?: string
): Promise<Product> {
  const payload = CreateProductSchema.parse(input);

  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized: Invalid or missing token.");
  }

  if (res.status === 403) {
    throw new Error("Forbidden: Access denied.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return ProductSchema.parse(data);
}

// PUT /api/products/:id/status
export async function updateProductStatus(
  id: string,
  input: UpdateStatusInput,
  token?: string
): Promise<Product> {
  const payload = UpdateStatusSchema.parse(input);

  const res = await fetch(`${API_URL}/api/products/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized: Invalid or missing token.");
  }

  if (res.status === 403) {
    throw new Error("Forbidden: Access denied.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return ProductSchema.parse(data);
}