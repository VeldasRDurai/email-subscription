require('dotenv').config();
const express = require('express');
const nodemailer = require("nodemailer");
const router  = express.Router();

router.post('/', async (req, res,next) => {
    // console.log(req.body);
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requiresAuth: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD ,
            },
        });
        
        let info = await transporter.sendMail({
            from: "Veldas R Durai " + process.env.EMAIL ,
            to  : req.body.reciver , 
            subject: req.body.subject ,
            text: req.body.message ,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).send();
    } catch(e){
        console.log( "Error : " + e);
        res.status(503).send(e);
    }
});

module.exports = router;