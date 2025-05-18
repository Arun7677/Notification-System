const nodemailer = require("nodemailer");
const notificationModel = require('../models/notification');
const userModel = require('../models/user')

const sendEmail = (email)=>{
const notification = notificationModel.findOne(email);
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "otto63@ethereal.email",
    pass: "2N9JTy5krXz5MycKb",
  },
});
(async () => {
  const info = await transporter.sendMail({
    from: '"otto63@ethereal.email',
    to: notification.email,
    subject: notification.title,
    text: notification.message, 
  });

  console.log("Message sent:", info.messageId);
})();
}

const sendSms = (email)=>{
    const user = userModel.findOne(email);
    const number = user.phone;

    const notification = notificationModel.findOne(email);
const accountSid = 'ACf7373776b40d6ca7e1e4fe084ce3a29c';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
    from: '+18156833640',
        to: number,
        body:notification.message
    })
    .then(message => console.log(message.sid));
}

module.exports = {
    sendEmail,
    sendSms,
};


