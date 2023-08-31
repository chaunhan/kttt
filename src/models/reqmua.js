const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const reqMua = new Schema({
    email: { type: String},
    id : {type: String},
    ten: {type: String},
    TenCourse: {type : String},
    tien: { type: Number},
    hoahong: {type: Number , default: 0},
    isCheck: { type: String, default: "false"},
    CreateAt: { type: Date, default: a},
});

module.exports = mongoose.model('reqMua', reqMua)