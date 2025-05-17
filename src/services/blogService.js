import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
});

const token = localStorage.getItem("token");

const getArticlePageTitle = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await apiClient.get(`/article/${user.slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getBlog = async () => {
  try {
    const response = await apiClient.get("/blog", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const addBlog = async (data) => {
  try {
    const response = await apiClient.post("/blog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { getArticlePageTitle, addBlog, getBlog };
