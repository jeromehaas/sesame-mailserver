"use strict";
const nodemailer = require("nodemailer");
const fs = require('fs'); 

const sendMail = async (req, res) => {

  const { receiverAddress } = req.body;
  const { receiverFirstname } = req.body;
  const { token } = req.body;


//   const invitationEmail = fs.readFile('',  
//   {encoding:'utf8', flag:'r'}, 
//   function(err, data) { 
// if(err) console.log(err); 
  
// console.log(invitationEmail);

// Calling the fs.readFileSync() method  
// for reading file 'input2.txt' 
let data = fs.readFileSync('./emails/invitation-email/index.html', 
              {encoding:'utf8', flag:'r'}); 
  
data = data.replace(/{%firstname%}/g, receiverFirstname);
data = data.replace(/{%token%}/g, token);              

console.log(data)
// console.log(token)
// console.log(receiverAddress);
// console.log(receiverFirstname);




  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "playground-area.com", // <= Add this
    host: "smtp.coresender.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "c9b2a30b-37b0-44dc-8eb7-aaaf52951a7b", // generated ethereal user
      pass: "4f7b17fb-ae63-4daf-9e26-e989f62aa7f6", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info@playground-area.com', // sender address
    to: receiverAddress, // list of receivers
    subject: "Your invitation to sesame", // Subject line
    text: "Your invitation to sesame", // plain text body
    html: data, // html body
  });

  console.log("Message sent: %s", info.messageId);

  res.status(200);
  res.send(token);

};

sendMail().catch(console.error)

module.exports = {
  sendMail,
};