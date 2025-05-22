import apiClient from "./apiClient";

const getUser = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error(
      "Error mendapatkan user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getUser };
