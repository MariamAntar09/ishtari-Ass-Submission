"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/api"; 
import type { Product } from "@/schemas/product.schema";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const token = process.env.NEXT_PUBLIC_DEMO_JWT_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0ZXIiLCJpYXQiOjE3ODUwMjEyNzZ9.ME5dGA-kTCdKFHzXwnSaiJYUgAlrJJFQNTjT28R2G5U";        
        const response = await fetchProducts(token);
        setProducts(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred while fetching products.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter products based on search term and selected status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper function to return distinct background & text colors per status
  const getBadgeStyle = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return { backgroundColor: "#dcfce7", color: "#166534" }; // Green
      case "inactive":
        return { backgroundColor: "#f3f4f6", color: "#374151" }; // Gray
      case "out_of_stock":
        return { backgroundColor: "#fef3c7", color: "#92400e" }; // Yellow/Orange
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" };
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
      <h1>Product Dashboard</h1>

      {/* Controls Section: Search & Filter */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* State Rendering */}
      {loading && <p>Loading products...</p>}

      {error && (
        <div style={{ padding: "1rem", backgroundColor: "#fee2e2", color: "#dc2626", borderRadius: "6px" }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div style={{ padding: "2rem", textAlign: "center", border: "1px dashed #ccc", borderRadius: "6px" }}>
          <p>No products found matching your criteria.</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
              <th style={{ padding: "0.75rem" }}>ID</th>
              <th style={{ padding: "0.75rem" }}>Name</th>
              <th style={{ padding: "0.75rem" }}>Status</th>
              <th style={{ padding: "0.75rem" }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const badgeStyle = getBadgeStyle(product.status);
              return (
                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.75rem" }}>{product.id}</td>
                  <td style={{ padding: "0.75rem", fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                        backgroundColor: badgeStyle.backgroundColor,
                        color: badgeStyle.color,
                      }}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}