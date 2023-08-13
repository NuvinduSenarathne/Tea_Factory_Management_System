var mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'
 
var contactusSchema = new mongoose.Schema({
    email: {
        type: String,
        work: mongoose.SchemaTypes.Email,
        required:true
    },

    message : {
        type : String,
        required: true
    }

    
},
{
    timestamps:true
});

const contactus = mongoose.model("contactus", contactusSchema);

module.exports = contactus;