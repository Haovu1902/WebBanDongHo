//khai báo thư viện express
const express = require('express');
const { getAllProduct, createProduct, updatteProductById, deleteProductId, getProductById } = require('../controller/controllerProduct');
const { ProductTypeURLMiddleware } = require('../middlewares/courseMiddleware');


// roter
const ProductRouter = express.Router();
// CRUD
// get all produc
ProductRouter.get("/product", ProductTypeURLMiddleware, getAllProduct);
// get all filter product


ProductRouter.post("/product", ProductTypeURLMiddleware, createProduct);
// update product by id
ProductRouter.put("/product/:ProductId", ProductTypeURLMiddleware, updatteProductById);
// get by id product
ProductRouter.get("/product/:ProductId", ProductTypeURLMiddleware, getProductById);
// delete by id product
ProductRouter.delete("/product/:ProductId", ProductTypeURLMiddleware, deleteProductId);
//ecports
module.exports = ProductRouter;

