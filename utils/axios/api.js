import axios from "axios";

const api = axios.create({
	baseURL: "https://ticket-byte-v1.herokuapp.com",
});

export default api;
