import API from "./api";


export const sendOtpForRegistration = async (email) => {
  try {
    const response = await API.post("/auth/send-otp-register", { email });
    return response;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

export const sendOtpForLogin = async (email) => {
  try {
    const response = await API.post("/auth/send-otp-login", { email });
    return response;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

export const varifyOTPAndLogin = async (email, otp) => {
  try {
    const response = await API.post("/auth/verify-otp-and-login", { email, otp });
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

export const registerAndLogin = async (companyName,email, otp) => {
  try {
    const response = await API.post("/auth/register-company-and-login", { companyName, email, otp });
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

export const getUserInfo = () => API.get('/auth/user');
export const getCompanyInfo = (token) =>
  API.get('/auth/company', {
    headers: { Authorization: `Bearer ${token}` },
  });