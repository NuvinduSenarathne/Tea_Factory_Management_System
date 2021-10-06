const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    }
},
{
    timestamps:true,
})

const Product = mongoose.model("products", productSchema);

module.exports = Product;