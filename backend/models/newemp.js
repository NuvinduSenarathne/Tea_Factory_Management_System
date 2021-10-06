const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    dob:{
        type: Date,
        required: true
    },

    nic:{
        type: String,
        required: true
    },

    caddress:{
        type: String,
        required: true
    },

    paddress:{
        type: String,
        required: true
    },

    desig:{
        type: String,
        required: true
    },

    caddress:{
        type: String,
        required: true
    },

    dept:{
        type: String,
        required: true
    },

    tp:{
        type: Number,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    salary:{
        type: Number,
        required: true
    },

    psw:{
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    }

})

const newemp = mongoose.model("newstaff", EmployeeSchema);

module.exports = newemp;