const products = [
  {
    id: "1",
    name: "Kitchen Product",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bedroom Product",
    status: "out_of_stock",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Living Room Product",
    status: "inactive",
    createdAt: new Date().toISOString(),
  },
];

async function findAll() {
  return products;
}

async function findById(id) {
  return products.find((product) => product.id === id);
}

let nextId = 4;

async function create(input) {
  const newProduct = {
    id: String(nextId++),
    ...input,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
}

async function updateStatus(id, status) {
  const product = products.find((p) => p.id === id);
  if (!product) return undefined;

  product.status = status;
  return product;
}

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
};