"use strict";
const nodemailer = require("nodemailer");
const fs = require('fs'); 

const sendMail = async (req, res) => {

  const { receiverAddress } = req.body;
  const { receiverFirstname } = req.body;
  const { token } = req.body;

let data = fs.readFileSync('./emails/invitation-email/index.html', 
              {encoding:'utf8', flag:'r'}); 
  
data = data.replace(/{%firstname%}/g, receiverFirstname);
data = data.replace(/{%token%}/g, token);              

  let transporter = nodemailer.createTransport({
    name: "playground-area.com", 
    host: "smtp.coresender.com",
    port: 587,
    secure: false, 
    auth: {
      user: "c9b2a30b-37b0-44dc-8eb7-aaaf52951a7b", 
      pass: "4f7b17fb-ae63-4daf-9e26-e989f62aa7f6", 
    },
  });

  await transporter.sendMail({
    from: 'info@playground-area.com',
    to: receiverAddress, 
    subject: "Your invitation to sesame", 
    text: "Your invitation to sesame", 
    html: data,
  });

  console.log("📩 Message sent!");

  res.status(200);
  res.send(`Message is successfully sent to: ${receiverAddress}`);

};

sendMail().catch(console.error)

module.exports = {
  sendMail,
};