const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const user = new Schema({
    email: { type: String},
    ten: { type: String},
    pass: { type:String},
    ref: {type : String, default: ""},
    refin: {type : String},
    phone: {type: String},
    address: {type: String},
    sex: {type : String},
    tien: {type : Number, default: 0},
    CreateAt: { type: Date, default: a},
});

module.exports = mongoose.model('user', user)