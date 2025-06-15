const sendEmail = require('./emailService');

const sendCompanyApprovalEmail = async (email, companyName) => {
    const subject = 'Your Company Has Been Approved on Bytrait';
    const text = `Dear ${companyName},\n\nYour registration on Bytrait has been approved. You can now log in and start posting jobs.\n\nBest regards,\nThe Bytrait Team`;
    const html = `
        <p>Dear <strong>${companyName}</strong>,</p>
        <p>Your registration on <strong>Bytrait</strong> has been <span style="color: green;"><b>approved</b></span>.</p>
        <p>You can now log in to your account and begin posting jobs and reviewing applications.</p>
        <p>Best regards,<br/>The Bytrait Team</p>
    `;

    await sendEmail({ to: email, subject, text, html });
};

module.exports = sendCompanyApprovalEmail;
