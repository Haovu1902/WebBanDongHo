//khai báo thư viện express
const express = require('express');
const { getAllProductType, createProductType, updatteProductTyperById, getProductTypeById, deleteProductTypeId } = require('../controller/controllerProductType');
const { ProductTypeURLMiddleware } = require('../middlewares/courseMiddleware');


// roter
const ProductTypeRouter = express.Router();
// CRUD
// get all producttpe
ProductTypeRouter.get("/producttype", ProductTypeURLMiddleware, getAllProductType);
// tao  producttype
ProductTypeRouter.post("/producttype", ProductTypeURLMiddleware, createProductType);
// update producttype by id
ProductTypeRouter.put("/producttype/:ProductTypeId", ProductTypeURLMiddleware, updatteProductTyperById);
// get by id producttype
ProductTypeRouter.get("/producttype/:ProductTypeId", ProductTypeURLMiddleware, getProductTypeById);
// delete by id productype
ProductTypeRouter.delete("/producttype/:ProductTypeId", ProductTypeURLMiddleware, deleteProductTypeId);
//ecports
module.exports = ProductTypeRouter;

