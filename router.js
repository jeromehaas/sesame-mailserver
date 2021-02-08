const express = require('express');
const Router = express.Router;

const router = new Router();
const mailController = require('./controller/sendMail');

router.post('/mail', mailController.sendMail);

module.exports = router;