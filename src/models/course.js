const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const course = new Schema({
    TenCourse: { type: String},
    GiaCourse: { type: String},
    GiaGoc: {type: String},
    SlBai: { type:String},
    DesSP: {type : String},
    ImgSP: {type: String},
    selled: { type: Number , default: 0},
    author: { type: String},
    createAt: { type: String, default: a }
});

module.exports = mongoose.model('course', course)