const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    item : {
        type : String,
        required : true
    },
    itemcode : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    unitprice : {
        type : Number,
        required : true
    },
    advance : {
        type : Number,
        required : true
    },
    deadline : {
        type: Date,
        required : true
    },
    completedDate : {
        type: Date
    },
    deliveredDate : {
        type: Date
    },
    city : {
        type: String,
        required : true
    },
    country : {
        type: String,
        required : true
    },
    status : {
        type: String,
        required : true
    },
    description : {
        type: String,
        default: "None"
    },
    customerID : {
        type : String,
        required : true
    }

},
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;