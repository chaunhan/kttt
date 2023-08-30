const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    id : {type : String},
    TenCourse : {type: String},
    GiaCourse : {type: Number},
})

module.exports = mongoose.model('cart', cart)