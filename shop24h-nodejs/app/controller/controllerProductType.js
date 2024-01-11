
const mongoose = require("mongoose");
const ProductTypeModel = require('../model/modelProductType')
// lấy tất cả ProductType
// Get All
const getAllProductType = (request, response) => {
    //B1: Thu thập dữ liệu
    const { name } = request.query;

    const condition = {};

    if (name) {
        const regex = new RegExp(`${name}`);
        condition.name = regex;
    }
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    ProductTypeModel.find(condition, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get All Product Types successfully",
                data: data
            })
        }
    })
}

// tạo mới producttype
const createProductType = (request, response) => {
    //b1: thu thập dữ liệu
    let bodyRequest = request.body;
    console.log(bodyRequest)
    //b2: validate dữ liệu
    if (!bodyRequest.name) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "name is require"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let createproducttype = {
        _id: mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description,

    }

    ProductTypeModel.create(createproducttype, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: Create Producttype success",
                data: data
            })
        }
    })
}
// lấy Producttype theo id
const getProductTypeById = (request, response) => {
    //b1: thu thập dữ liệu
    let ProductTypeId = request.params.ProductTypeId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductTypeId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "ProductType ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    ProductTypeModel.findById(ProductTypeId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get user by id success",
                data: data
            })
        }
    })
}
// update theo id
const updatteProductTyperById = (request, response) => {

    //B1:Chuẩn bị dữ liệu
    let ProductTypeId = request.params.ProductTypeId;
    let requestBody = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductTypeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let ProductTypeUpdate = {
        name: requestBody.name,
        description: requestBody.description
    }

    ProductTypeModel.findByIdAndUpdate(ProductTypeId, ProductTypeUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update ProductType success",
                data: data
            })
        }
    })
}
// DELETE A  ProductType
const deleteProductTypeId = (request, response) => {

    //B1: Chuẩn bị dữ liệu
    let ProductTypeId = request.params.ProductTypeId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductTypeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not a valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    ProductTypeModel.findByIdAndDelete(ProductTypeId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Delete producttype success"
            })
        }
    })
}
module.exports = {
    getAllProductType:getAllProductType,
    createProductType:createProductType,
    getProductTypeById: getProductTypeById,
    updatteProductTyperById : updatteProductTyperById,
    deleteProductTypeId: deleteProductTypeId
}