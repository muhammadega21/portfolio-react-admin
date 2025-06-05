import apiClient from "./apiClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const response = await apiClient.post("/login", formData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
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
    let isMounted = true;

    const verifyAuth = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await apiClient.get("/user");
        if (!isMounted) return;
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  return token ? children : null;
};

export { register, login, logout, ProtectedRoute };
