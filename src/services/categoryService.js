import apiClient from "./apiClient";

const getCategories = async () => {
  try {
    const response = await apiClient.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

const addCategory = async (formData) => {
  try {
    const response = await apiClient.post("/category", formData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

const updateCategory = async (id, formData) => {
  try {
    const response = await apiClient.post(`/category/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export { getCategories, addCategory, updateCategory, deleteCategory };
