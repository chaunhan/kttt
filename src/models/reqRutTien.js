const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const reqRutTien = new Schema({
    email: { type: String},
    ten: { type: String},
    tienrut: { type: Number},
    bankName: {type: String},
    bankAcc: {type: String},
    bankNumber: {type: String},
    isCheck: { type: String, default: "false"},
    CreateAt: { type: Date, default: a},
});

module.exports = mongoose.model('reqRutTien', reqRutTien)