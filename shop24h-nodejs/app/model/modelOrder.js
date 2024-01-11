//bước 1: khai báo mongose
const mongoose = require("mongoose")
// bước 3: khai báo thư viện schema
const Schema = mongoose.Schema
// khởi tạo các thuộc tính
const OrderSchema = {
    _id: {
        type: mongoose.Types.ObjectId
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shipperDate: {
        type: String
    },
    note: {
        type: String
    },
    orderDetail: {
        type: Array
    },
    cost: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    },
    customerInfo:{
        type:Object
    }



}
module.exports = mongoose.model("order", OrderSchema);