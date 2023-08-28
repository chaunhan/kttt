const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String},
    ten: { type: String},
    pass: { type:String},
    ref: {type : String},
    refin: {type : String},
    phone: {type: String},
    address: {type: String},
    sex: {type : String},
    tien: {type : Number},
    CreateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('user', user)