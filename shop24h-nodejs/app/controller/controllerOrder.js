
const mongoose = require("mongoose");
const OrderModel = require('../model/modelOrder')
const CustomerModel = require("../model/modelCustomer");
//Create Order
const createOrderOfCustomer = (request, response) => {

    //B1:Thu thập dữ liệu
    let CustomerId = request.params.CustomerId
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(CustomerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }

    if (!(Number.isInteger(bodyRequest.cost) && bodyRequest.cost >= 0)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "cost is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let newOrder = {
        _id: mongoose.Types.ObjectId(),
        shipperDate: bodyRequest.shipperDate,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        cost: bodyRequest.cost,
        customerInfo:bodyRequest.customerInfo
    }

    OrderModel.create(newOrder, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            CustomerModel.findByIdAndUpdate(CustomerId, {
                $push: { orders: data._id }
            },
                (error, updateCustomer) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal sever Error",
                            message: error.message
                        })
                    } else {
                        return response.status(201).json({
                            status: "Create Order Success",
                            data: data
                        })
                    }
                }
            )
        }
    })
}
const getAllOrderOfCustomer = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let CustomerId = request.params.CustomerId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(CustomerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is invalid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel.findById(CustomerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Get data success",
                    data: data.orders
                })
            }
        })
}


// lấy tất cả Order
const getAllOrder = (request, response) => {
    //b1: thu thập dữ liệu
    //b2: validate dữ liệu
    //b3: thao tác với cơ sở dữ liệu
    OrderModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get all Order success",
                data: data
            })
        }
    })
}
// lấy Order theo id
const getOrderById = (request, response) => {
    //b1: thu thập dữ liệu
    let OrderId = request.params.OrderId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(OrderId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Order ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    OrderModel.findById(OrderId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get Order by id success",
                data: data
            })
        }
    })
}
// update theo id
const updateOrderById = (request, response) => {

    //B1:Chuẩn bị dữ liệu
    let OrderId = request.params.OrderId;
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(OrderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let OrderUpdate = {
        orderDate: bodyRequest.orderDate,
        shipperDate: bodyRequest.shipperDate,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        cost: bodyRequest.cost
    }


    OrderModel.findByIdAndUpdate(OrderId, OrderUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update Order success",
                data: data
            })
        }
    })
}
// DELETE A  Order
// Delete Order
const deleteOrderById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Course ID is not valid"
        })
    }
    if (!(mongoose.Types.ObjectId.isValid(orderId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Review ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    OrderModel.findByIdAndDelete(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            //Sau khi xóa xong 1 review khỏi collection cần xóa thêm orderId trong course đang chứa nó
            CustomerModel.findByIdAndUpdate(customerId,
                {
                    $pull: { orders: orderId }
                },
                (errore) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: error.message
                        })
                    }
                    else {
                        return response.status(204).json({
                            status: "Success: Delete review success",
                        })
                    }
                }
            )
        }
    })
}
module.exports = {
    createOrderOfCustomer: createOrderOfCustomer,
    getAllOrder :getAllOrder,
    getOrderById: getOrderById,
    updateOrderById : updateOrderById,
    deleteOrderById: deleteOrderById,
    getAllOrderOfCustomer: getAllOrderOfCustomer
}