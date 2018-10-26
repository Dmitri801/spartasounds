// Nodemailer
const smptTransport = nodeMailer.createTransport({
  service: "yahoo",
  auth: {
    user: "spartasounds_store@yahoo.com",
    pass: "8081830Ds"
  }
});

let mailOptions = {
  from: "Sparta Sounds <spartasounds_store@yahoo.com>",
  to: "dmitriys801@gmail.com",
  subject: "Send Test Email",
  text: "Testing The Waves Mail",
  html: "<b>Hello This is working..</b>"
};

smptTransport.sendMail(mailOptions, (err, response) => {
  if (err) return console.log(err);
  console.log("Email Sent", response);
});
