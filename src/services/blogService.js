import apiClient from "./apiClient";

const getArticlePageTitle = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await apiClient.get(`/article/${user.slug}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getBlog = async () => {
  try {
    const response = await apiClient.get("/blog");
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getBlogById = async (id) => {
  try {
    const response = await apiClient.get(`/blog/${id}`);
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
      },
    });
    return response.data;
    // return console.log(data);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateBlog = async (id, data) => {
  try {
    const response = await apiClient.post(`/blog/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await apiClient.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export {
  getArticlePageTitle,
  addBlog,
  getBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
};
