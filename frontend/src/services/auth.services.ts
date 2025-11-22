import { ILoginFormValues } from "@/validators/loginSchema";
import { IRegisterFormValues } from "@/validators/registerSchema";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (userData: ILoginFormValues) => {
  try {
    const response = await fetch(`${apiURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Invalid credentials",
      };
    }
    const data = await response.json();

    document.cookie = `token=${data.result.access_token}; Path=/; Max-Age=86400; SameSite=Lax`;

    return {
      success: true,
      message: data.message,
      user: data.result.user,
      token: data.result.access_token,
    };
  } catch (error) {
    console.error("API error", error);
    return {
      success: false,
      message: "Unexpected error. Please try again later.",
    };
  }
};

export const registerUser = async (userData: IRegisterFormValues) => {
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error("API error", error);
    return {
      success: false,
      message: "Unexpected error. Please try again later.",
    };
  }
};
