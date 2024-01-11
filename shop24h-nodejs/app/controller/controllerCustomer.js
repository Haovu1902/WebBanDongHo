
const mongoose = require("mongoose");
const customerModel = require('../model/modelCustomer')
// lấy tất cả ProductType
const getAllCustomers = (request, response) => {
    //B1: Thu thập dữ liệu
    let phoneNumber = request.query.phoneNumber;
    const condition = {};

    if (phoneNumber) {
       
        condition.phone = phoneNumber;
    }
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    customerModel
        .find(condition)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Customer success",
                    data: data
                })
            }
        })

}


// tạo mới producttype
const createCustomer = (req, res) => {

    //B1: thu thập dữ liệu

    let bodyRequest = req.body;

    let newCustomer = {

        _id: mongoose.Types.ObjectId(),

        fullName: bodyRequest.fullName,

        phone: bodyRequest.phone,

        email: bodyRequest.email,

        address: bodyRequest.address,

        city: bodyRequest.city,

        country: bodyRequest.country,

    }

    //B2: kiểm tra dữ liệu

  

    if (!bodyRequest.phone || !bodyRequest.fullName || !bodyRequest.email) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "not is require"
        })
    }

    //B3: thao tác với cơ sở dữ liệu

    customerModel.create(newCustomer, (err,data) => {

        if (err) {

            return res.status(500).json({

                status: "Error 500: Internal server error",

                message: err.message

            })

        } else {

            return res.status(201).json(data)

        }

    })

}
// lấy Cústomer theo id
const getCustomerById = (request, response) => {
    //b1: thu thập dữ liệu
    let CustomerId = request.params.CustomerId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(CustomerId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Customer ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    customerModel.findById(CustomerId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get Customer by id success",
                data: data
            })
        }
    })
}
// update theo id
const updateCustomertById = (request, response) => {

    //B1:Chuẩn bị dữ liệu
    let CustomerId = request.params.CustomerId;
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(CustomerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let CustomerUpdate = {
        fullName: bodyRequest.fullName,
        phone: bodyRequest.phone,
        email: bodyRequest.email,
        address: bodyRequest.address,
        city: bodyRequest.city,
        country: bodyRequest.country,
    }


    customerModel.findByIdAndUpdate(CustomerId, CustomerUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update Customer success",
                data: data
            })
        }
    })
}
// DELETE A  ProductType
const deleteCustomerId = (request, response) => {

    //B1: Chuẩn bị dữ liệu
    let CustomerId = request.params.CustomerId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(CustomerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    customerModel.findByIdAndDelete(CustomerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Delete Customer success"
            })
        }
    })
}
module.exports = {
    getAllCustomers:getAllCustomers,
    createCustomer:createCustomer,
    getCustomerById: getCustomerById,
    updateCustomertById : updateCustomertById,
    deleteCustomerId: deleteCustomerId
}