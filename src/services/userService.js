import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
});

const getUser = async (token) => {
  try {
    const response = await apiClient.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export { getUser };
