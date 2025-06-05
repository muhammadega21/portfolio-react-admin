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

const updateProfileUser = async (formData) => {
  try {
    const response = await apiClient.post(`/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { getUser, updateProfileUser };
