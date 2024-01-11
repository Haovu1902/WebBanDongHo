//bước 1: khai báo mongose
const mongoose = require("mongoose")
// bước 3: khai báo thư viện schema
const Schema = mongoose.Schema
// khởi tạo các thuộc tính
const CustomerSchema = {
    _id: {
        type: mongoose.Types.ObjectId
    },
    fullName : {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unipue : true
    },
    email   : {
        type: String,
        required: true,
    },

    address: {
       type: String,
       default: ""
    },
    city: {
        type: String,
        default: ""
     },
     country: {
        type: String,
        default: ""
     },
     orders:[{
        type: Object,
        ref:'order'
    }], 
    
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }

}
module.exports = mongoose.model("customer", CustomerSchema);