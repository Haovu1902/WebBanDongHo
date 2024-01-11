//khai báo thư viện express
const express = require('express');
const { getAllCustomers, createCustomer, updateCustomertById, getCustomerById, deleteCustomerId } = require('../controller/controllerCustomer');
const { ProductTypeURLMiddleware } = require('../middlewares/courseMiddleware');


// roter
const CustomerRouter = express.Router();
// CRUD
// get all customer
CustomerRouter.get("/customer", ProductTypeURLMiddleware, getAllCustomers);
// tao  customer
CustomerRouter.post("/customer", ProductTypeURLMiddleware, createCustomer);
// update customer by id
CustomerRouter.put("/customer/:CustomerId", ProductTypeURLMiddleware, updateCustomertById);
// get by id customer
CustomerRouter.get("/customer/:CustomerId", ProductTypeURLMiddleware, getCustomerById);
// delete by id customer
CustomerRouter.delete("/customer/:CustomerId", ProductTypeURLMiddleware, deleteCustomerId);
//ecports
module.exports = CustomerRouter;

