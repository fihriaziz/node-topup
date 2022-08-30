const mongoose = require('mongoose')

let userScheema = mongoose.Schema({
    email: {
        type: String,
        require : [true, 'email harus diisi']
    },
    name: {
        type: String,
        require : [true, 'name harus diisi']
    },
    password: {
        type: String,
        require : [true, 'kata sandi harus diisi']
    },
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'admin'
    },
    phoneNumber : {
        type: String,
        require: [true, 'nomor telephone harus diisi']
    },
    status: {
        type: String,
        enum: ['Y','N'],
        default: 'Y'
    },
}, {timestamps: true})

module.exports = mongoose.model('User',userScheema)