const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Bytrait OTP for login',
        text: `Your OTP is: ${otp}. It will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.`,
        html: 'Your OTP for login is <b>' + otp + '</b>. It will expire in <b>' + (process.env.OTP_EXPIRY_MINUTES || 5) + '</b> minutes.',
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            throw new Error('Email not sent');
        } else {
            console.log('Email sent:', info.response);
        }
    }
    );
    
};

module.exports = sendOTPEmail;
