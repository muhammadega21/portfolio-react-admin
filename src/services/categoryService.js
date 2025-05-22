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

export { getCategories };
