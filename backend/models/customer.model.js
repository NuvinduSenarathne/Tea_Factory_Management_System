const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    company : {
        type : String,
        default : "N/A"
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    street1 : {
        type : String,
        default : "N/A"
    },
    street2 : {
        type : String,
        default : "N/A"
    },
    city : {
        type : String,
        default : "N/A"
    },
    country : {
        type : String,
        default : "Sri Lanka"
    },
    isCorporate : {
        type : Boolean,
        default : false
    }
},
    {
        timestamps: true
    }
)

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;