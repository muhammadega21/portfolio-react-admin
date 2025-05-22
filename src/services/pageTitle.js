import apiClient from "./apiClient";

const updatePageTitle = async (route, data) => {
  try {
    const response = await apiClient.post(`${route}`, data);

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
