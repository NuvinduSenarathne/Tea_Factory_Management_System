const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({  

    startTime:{
        type: String,
        
    },

    leaveTime:{
        type: String,
        
    },

    userID:{
        type: String,
    },

    date:{
        type: String,
        required: true
    }

})

const newemp = mongoose.model("attendance1", EmployeeSchema);

module.exports = newemp;