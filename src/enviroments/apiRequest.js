import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api", // URL của backend API
    headers: {
        "Content-Type": "application/json",
    },
    // Nếu cần, bạn có thể thêm các header khác tại đây
    withCredentials: true, 
});

export default apiRequest;
