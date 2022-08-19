import api from "@utils/axios/api";

const fetcher = {
	findMyBooking: () => api.get("/booking/getall").then((res) => res.data.booking),
	findOneticket: (id) => api.get("/ticket/find1ticket", { params: { id_ticket: id } }).then((res) => res.data.ticket[0]),
	findOneBooking: (id) => api.get("/booking/getbyidbooking", { params: { id_booking: id } }).then((res) => res.data.booking[0]),
};

export default fetcher;
