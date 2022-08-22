import api from "@utils/axios/api";

const multipart = { headers: { "Content-Type": "multipart/form-data" } };

const fetcher = {
	// Auth
	register: (data) => api.post("/auth/register", data).then((res) => res.data),
	login: (data) => api.post("/auth/login", data).then((res) => res.data),

	// User
	getProfile: (id) => api.get(`/user/getbyid/${id}`).then((res) => res.data[0]),
	editProfile: (data) => api.patch("/user/edit", data).then((res) => res.data),
	postPhotoProfile: (data) => api.patch("/user/photo", data, multipart).then((res) => res.data),

	// Ticket
	searchTicket: (params) => api.get("/ticket/find-ticket", { params: { ...params } }).then((res) => res.data),
	findOneticket: (id) => api.get("/ticket/find1ticket", { params: { id_ticket: id } }).then((res) => res.data.ticket[0]),
	cancelTicket: (data) => api.patch("/booking/statuspaymentcanceled", data).then((res) => res.data),

	// Booking
	postBooking: (data) => api.post("/booking/post", data).then((res) => res.data),
	findMyBooking: (id) => api.get("booking/getbyiduser", { params: { id_user: id } }).then((res) => res.data.booking),
	findOneBooking: (id) => api.get("/booking/getbyidbooking", { params: { id_booking: id } }).then((res) => res.data.booking[0]),

	// Place
	getPlace: () => api.get("/place").then((res) => res.data.place),
	findOnePlace: (id) => api.get("/place/findbyID", { params: { id } }).then((res) => res.data.place[0]),
};

export default fetcher;
