// In-memory array acting as our mock database
const products = [
  {
    id: "1",
    name: "Kitchen Product",
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bedroom Product",
    status: "out_of_stock",
    createdAt: new Date().toISOString(),
  },
];


export async function findAll() {
  return products;
}

export async function findById(id) {
  return products.find((product) => product.id === id);
}

let nextId = 3;

export async function create(input) {
  const newProduct = {
    id: String(nextId++),
    ...input,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
}

export async function updateStatus(id, status) {
  const product = products.find((p) => p.id === id);
  if (!product) return undefined;

  product.status = status;
  return product;
}