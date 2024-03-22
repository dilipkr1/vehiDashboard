const mongoose = require('mongoose')

const settingBusinessDetails = new mongoose.Schema({
    businessName: {
        type: String,
         required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    bio:{
        type:String,
        required:true
    }

})



module.exports = mongoose.model('BusinessDetails', settingBusinessDetails)