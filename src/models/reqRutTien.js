const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqRutTien = new Schema({
    email: { type: String},
    ten: { type: String},
    tienrut: { type: Number},
    bankName: {type: String},
    bankAcc: {type: String},
    bankNumber: {type: String},
    isCheck: { type: String, default: "false"},
    CreateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('reqRutTien', reqRutTien)