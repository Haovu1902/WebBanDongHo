// Bước 1 Improt Mongose
const mongoose = require("mongoose");
// bước 2: khai báo thư viện Schema từ mongose
const Schema = mongoose.Schema;
// Bước 3: khởi tạo Schema voiwc các thược tính
const ProductTypeSchema = new Schema({
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
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.model("ProductType", ProductTypeSchema);
