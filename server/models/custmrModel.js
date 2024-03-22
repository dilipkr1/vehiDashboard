const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
     },
    customerName: {
        type: String,

    },
    customerEmail: {
        type: String,
        required: true,
        unique: true
    },
    customerPhone: {
        type: Number,
        // require: true
    },
    customerAddress: {
        type: String,
        // required: true
    }
},
    {
        timestamps: true
    })




module.exports = mongoose.model('Customer', customerSchema)