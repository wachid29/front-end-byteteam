import api from "@utils/axios/api";

const fetcher = {
	findOneticket: (id) => api.get("/ticket/find1ticket", { params: { id_ticket: id } }).then((res) => res.data.ticket[0]),
	findMyBooking: () => api.get("/booking/getall").then((res) => res.data.booking),
};

export default fetcher;
