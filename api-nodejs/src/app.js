const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/errorHandler.middleware");
const productRoutes = require("./routes/product.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/products", productRoutes);
app.use("/health", healthRoutes);

app.use(errorHandler);

module.exports = app;