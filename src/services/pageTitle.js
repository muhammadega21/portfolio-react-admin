import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const updatePageTitle = async (route, data) => {
  try {
    const response = await apiClient.post(`${route}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);

    if (e.response) {
      throw new Error(e.response.data.message || "Failed to update page title");
    } else if (e.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request setup error");
    }
  }
};

export { updatePageTitle };
