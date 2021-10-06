const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const safetyStockSchema = new Schema({
    Safety_Set : {
        type : String,
        required : true
    },
    SKU : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },
    Unit_Price : {
        type : Number,
        required: true
    },
    Available_Units : {
        type : Number,
        required : true
    },
    Expire_Date : {
        type : Date,
        required : true
    }
},
{
    timestamps:true,
})

const SafetyStock = mongoose.model("safetystock", safetyStockSchema);

module.exports = SafetyStock;