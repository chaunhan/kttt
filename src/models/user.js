const Nanoid = require('nanoid');
const NanoidAsync = require('nanoid/async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var today = new Date();
var a = today.toISOString().substring(0, 10);

const id = Nanoid.customAlphabet('ABCDEF1234567890', 6);

const user = new Schema({
    _id: {
        type: String,
        default: () => id(),
    },
    email: { type: String},
    ten: { type: String},
    pass: { type:String},
    ref: {type : String, default: ""},
    phone: {type: String},
    address: {type: String},
    sex: {type : String},
    tien: {type : Number, default: 0},
    cDaMua : {type : String, default: ""},
    CreateAt: { type: Date, default: a},
});

module.exports = mongoose.model('user', user)