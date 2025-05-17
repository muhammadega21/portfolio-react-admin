import axios from "axios";

const api_url = `${import.meta.env.VITE_API_URL}`;

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
});

const token = localStorage.getItem("token");

const getCategories = async () => {
  try {
    const response = await apiClient.get("/category", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export { getCategories };
