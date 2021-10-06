const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const damagedStockSchema = new Schema({
    SKU : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },
    Available_Units : {
        type : Number,
        required : true
    },
    Damaged_Type : {
        type : String,
        required : true
    }
},
{
    timestamps:true,
})

const DamagedStock = mongoose.model("damagedstock", damagedStockSchema);

module.exports = DamagedStock;