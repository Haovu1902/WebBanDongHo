const express = require("express");
const mongoose = require("mongoose");
const CustomerRouter = require("./app/router/routerCustomer");
const OrderRouter = require("./app/router/routerOrder");
const ProductTypeRouter = require("./app/router/routerPorductType");
const ProductRouter = require("./app/router/routerProduct");
//Khỏi tạo app  nodeJS
const app = new express();

//Khai báo middleware json
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Khai báo middleware đọc dữ liệu UTF-8
app.use(express.urlencoded({
    extended: true
}))
//  Khai báo cổng chạy nodejs
const port = 8000;

mongoose.connect("mongodb://localhost:27017/CRUD_Shop24h", (err) => {
    if (err) {
        throw err;
    }

    console.log("kết nối thành công!");
})
// sử dung router
app.use('/', ProductTypeRouter);
app.use('/', ProductRouter);
app.use('/', CustomerRouter);
app.use('/', OrderRouter);




// Khai báo chạy trên cổng nodeJS
app.listen(port, () => {
    console.log(`App chạy trên cổng ${port}`);
})
