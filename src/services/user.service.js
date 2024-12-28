import apiRequest from "../enviroments/apiRequest";

// Get all users
export const userService = {
  async getAllUsers () {
    try {
      const response = await apiRequest.get("/users");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getUserById(userId){
    try {
        const res = await apiRequest.get("/users/search/"+ userId);
        console.log('vdsbhnm,nm ', res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
}