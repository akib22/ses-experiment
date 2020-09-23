var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var smtpPassword = require('aws-smtp-credentials');
require('dotenv').config();

var mailOptions = {
  from: 'masum@aaroza.com',
  to: 'legendsgolergo718@gmail.com',
  text: 'This is some text',
  html: '<b>This is some HTML</b>',
};
function callback(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
}

// Send e-mail using AWS SES
console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
mailOptions.subject = 'Nodemailer SES transporter';
var sesTransporter = nodemailer.createTransport(sesTransport({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}));
sesTransporter.sendMail(mailOptions, callback);

// Send e-mail using SMTP
mailOptions.subject = 'Nodemailer SMTP transporter';
var smtpTransporter = nodemailer.createTransport({
  port: 465,
  host: 'email-smtp.us-west-2.amazonaws.com',
  secure: true,
  auth: {
    user: process.env.AWS_ACCESS_KEY_ID,
    pass: smtpPassword(process.env.AWS_SECRET_ACCESS_KEY),
  },
  debug: true
});
smtpTransporter.sendMail(mailOptions, callback);
