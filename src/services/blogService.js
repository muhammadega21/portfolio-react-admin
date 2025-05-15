import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
});

const userSlug = JSON.parse(localStorage.getItem("user"));

const getArticlePageTitle = async () => {
  try {
    const response = await apiClient.get(`/article/${userSlug.slug}`, {
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

export { getArticlePageTitle };
