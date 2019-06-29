var nodemailer = require('nodemailer');
const config = require('config');

function sendMail(recipientAddress, subject, htmlBody, res) {
  let passwordMailSender = config.get('passwordMailSender');
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mieter.engel24@gmail.com',
      pass: passwordMailSender
    }
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: ' "fuburo online" <mieter.engel24@gmail.com>',
    to: recipientAddress,
    subject: subject,
    text: 'Hello World',
    html: htmlBody
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err)
      res.send({
        error: 500,
        message: 'Error: not able to send you email!'
      });
    res.status(200).send({
      message: 'Please check your email! Thank you!'
    });
  });
}
module.exports.sendMail = sendMail;
