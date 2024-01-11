//khai báo thư viện express
const express = require('express');
const { getAllOrder, updateOrderById, getOrderById, deleteOrderById, createOrderOfCustomer, getAllOrderOfCustomer } = require('../controller/controllerOrder');

const { ProductTypeURLMiddleware } = require('../middlewares/courseMiddleware');


// roter
const OrderRouter = express.Router();
// CRUD
// create tạo order theo id của khách hàng
OrderRouter.post("/orders/:CustomerId/orders", ProductTypeURLMiddleware, createOrderOfCustomer);
// gọi tất cả các order của khách hàng
OrderRouter.get("/orders/:CustomerId/orders", ProductTypeURLMiddleware, getAllOrderOfCustomer);
// get all Order
OrderRouter.get("/orders", ProductTypeURLMiddleware, getAllOrder);
// update Order by id
OrderRouter.put("/orders/:OrderId", ProductTypeURLMiddleware, updateOrderById);
// get by id Order
OrderRouter.get("/orders/:OrderId", ProductTypeURLMiddleware, getOrderById);
// delete by id Order
OrderRouter.delete("/customers/:customerId/orders/:orderId", deleteOrderById)
//ecports
module.exports = OrderRouter;

