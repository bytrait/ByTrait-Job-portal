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

export const verifyOtp = async (email, otp) => {
  try {
    const response = await API.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

