// Bước 1 Improt Mongose
const mongoose = require("mongoose");
// bước 2: khai báo thư viện Schema từ mongose
const Schema = mongoose.Schema;
// Bước 3: khởi tạo Schema voiwc các thược tính
const ProductSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        ref: "ProductType",
        required: true  
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice :{ 
        type: Number,
        required: true
    },
    promotionPrice: {
        type : Number
    },
    amount : {
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
    }

})
module.exports = mongoose.model("Product", ProductSchema);
