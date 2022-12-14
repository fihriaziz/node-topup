const mongoose = require('mongoose')

let paymentSchema = ({
    type: {
        type: String,
        require: [true, "tipe pembayaran harus diisi"]
    },
     status: {
         type: String,
         enum: ['Y','N'],
         default: 'Y'
     },
     banks: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Bank'
     }]
})

module.exports = mongoose.model('Payment', paymentSchema)