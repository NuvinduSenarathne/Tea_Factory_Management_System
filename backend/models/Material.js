const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
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
    Net_Weight : {
        type : Number,
        required :true
    }
},
{
    timestamps:true,
})

const Material = mongoose.model("material",materialSchema);

module.exports = Material;