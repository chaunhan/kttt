const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const baihoc = new Schema({
    ThuocKhoa : {type: String},
    TenBai : { type: String},
    Title: { type: String},
    link: { type: String},
    next: { type: String},
    pre: {type: String}
});

module.exports = mongoose.model('baihoc', baihoc)