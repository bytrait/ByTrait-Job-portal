const {OTP} = require('../models');

const verifyOTP = async (email, otp) => {
    try {
        const record = await OTP.findOne({ where: { email, otp } });
        if (record) {
            OTP.destroy({ where: { email, otp } });
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
};

module.exports = verifyOTP;

