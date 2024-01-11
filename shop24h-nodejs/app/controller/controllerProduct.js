
const mongoose = require("mongoose");
const ProductModel = require('../model/modelProduct')
// // lấy tất cả ProductType
// const getAllProduct = (request, response) => {
//     //b1: thu thập dữ liệu
//     //b2: validate dữ liệu
//     //b3: thao tác với cơ sở dữ liệu
//     ProductModel.find((error, data) => {
//         if (error) {
//             response.status(500).json({
//                 status: "Error 500: Internal sever Error",
//                 message: error.message
//             })
//         }
//         else {
//             response.status(200).json({
//                 status: "Success: Get all Product success",
//                 data: data
//             })
//         }
//     })
// }
// gọi Filter product
const getAllProduct = (request, response) => {
    const { name, minpromotionPrice, maxpromotionPrice, type } = request.query;

    const condition = {}

    if(name) {
        const regex = new RegExp(`${name}`)

        condition.name = regex
    }
    if (type) {
        condition.type = type;
    }
    if(minpromotionPrice) {
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $gte: minpromotionPrice
        }
    }

    if(maxpromotionPrice) {
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $lte: maxpromotionPrice
        }
    }

    let limit = request.query.limit;
    let skip = request.query.skip

    ProductModel.find(condition).limit(limit).skip(skip).exec((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success",
                data: data
            })
        }
    })
}
// tạo mới producttype
const createProduct = (request, response) => {
    //b1: thu thập dữ liệu
    let bodyRequest = request.body;
    console.log(bodyRequest)
    //b2: validate dữ liệu
    if (!bodyRequest.name || !bodyRequest.type || !bodyRequest.imageUrl) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "not is require"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let createproduct = {
        _id: mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description,
        type: bodyRequest.type,
        imageUrl: bodyRequest.imageUrl,
        buyPrice: bodyRequest.buyPrice,
        promotionPrice: bodyRequest.promotionPrice,
        amount : bodyRequest.amount
    }

    ProductModel.create(createproduct, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: Create user success",
                data: data
            })
        }
    })
}
// lấy Producttype theo id
const getProductById = (request, response) => {
    //b1: thu thập dữ liệu
    let ProductId = request.params.ProductId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Product ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    ProductModel.findById(ProductId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get Product by id success",
                data: data
            })
        }
    })
}
// update theo id
const updatteProductById = (request, response) => {

    //B1:Chuẩn bị dữ liệu
    let ProductId = request.params.ProductId;
    let requestBody = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let ProductUpdate = {
        name: requestBody.name,
        description: requestBody.description,
        imageUrl: requestBody.imageUrl,
        buyPrice: requestBody.buyPrice,
        promotionPrice: requestBody.promotionPrice,
        amount: requestBody.amount
    }

    ProductModel.findByIdAndUpdate(ProductId, ProductUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update Produc success",
                data: data
            })
        }
    })
}
// DELETE A  ProductType
const deleteProductId = (request, response) => {

    //B1: Chuẩn bị dữ liệu
    let ProductId = request.params.ProductId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not a valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    ProductModel.findByIdAndDelete(ProductId, (error, data) => {
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
    getAllProduct:getAllProduct,
    createProduct:createProduct,
    getProductById: getProductById,
    updatteProductById : updatteProductById,
    deleteProductId: deleteProductId,
    // getAllFilterProduct: getAllFilterProduct
}