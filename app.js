const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/api/auth");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/categories");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
