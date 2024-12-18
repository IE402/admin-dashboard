import apiRequest from "../enviroments/apiRequest";

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiRequest.get("/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};