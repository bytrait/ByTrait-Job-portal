import API from "./api";

export const sendOtp = async (email,companyName) => {
  try {
    const response = await API.post("/auth/send-otp", { email ,companyName});
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
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

