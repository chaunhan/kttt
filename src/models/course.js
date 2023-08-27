const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
    TenCourse: { type: String},
    GiaCourse: { type: String},
    GiaGoc: {type: String},
    SlBai: { type:String},
    DesSP: {type : String},
    ImgSP: {type: String,},
});

module.exports = mongoose.model('course', course)