var nodemailer = require('nodemailer');

function sendMail(recipientAddress, subject, body, res) {
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mieter.engel24@gmail.com',
      pass: 'Engel2019'
    }
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: ' "Mieter Engel" <mieter.engel24@gmail.com>',
    to: recipientAddress,
    subject: subject,
    text: 'Hello World',
    html: body
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
