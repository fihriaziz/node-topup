const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
})

module.exports = mongoose.model('Category', categorySchema);