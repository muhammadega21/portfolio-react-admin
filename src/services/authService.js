import axios from "axios";
import { useEffect } from "react";
import { getUser } from "./userService";
import { useNavigate } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
});

const register = async (userData) => {
  try {
    if (!userData) {
      throw new Error("Invalid user data");
    }

    const response = await apiClient.post("/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

const login = async (formData) => {
  try {
    const response = await apiClient.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

const logout = async (token) => {
  try {
    const response = await apiClient.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await getUser(token);
        // Jika valid, biarkan render children
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    verifyAuth();
  }, [token, navigate]);

  return token ? children : null;
};

export { register, login, logout, ProtectedRoute };
