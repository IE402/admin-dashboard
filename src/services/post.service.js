import apiRequest from "../enviroments/apiRequest";

// Get all users
export const getAllPosts = async () => {
  try {
    const response = await apiRequest.get("/posts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const countByCity = async () => {
  try {
    const response = await apiRequest.get("/posts/city/count");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}