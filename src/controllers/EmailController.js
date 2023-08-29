const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email,otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));



    
    console.log(otp)
  // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Mã xác nhận rút tiền", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Mã Xác Nhận Của bạn là</b></div> ${otp}`,
    });
}


module.exports = {
    sendEmailCreateOrder
}