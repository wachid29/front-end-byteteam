// /* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState, useContext, useEffect } from "react";

import Sidebar from "layouts/admin/Sidebar";
import Navbar from "@components/navbar/admin/Navbar";
// import profileStyle from "../styles/profile.module.css";
// import imgPlane from "../public/images/plane.png";

// Radio Button untuk Update status booking
let statusPayment = ["issue", "boarding"];
// Radio Button untuk filtering by status booking
let allStatusPayment = ["all", "waiting", "issue", "boarding", "canceled"];

// PERSIAPAN UNTUK ENV DOMAIN
var url = "https://ticket-byte-v1.herokuapp.com";
// var url = "http://localhost:8000";

//firebase
import { database } from "../../firebase";
import { ref, set } from "firebase/database";

import BookingStatus from "@components/pages/BookingStatus";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

const editBooking = (props) => {
	const { query } = props;
	const [Datas, setDatas] = useState([]);
	const [Update, setUpdate] = useState(Object.keys(query).length !== 0 ? query.status_payment : "");
	const [IdBooking, setIdBooking] = useState(Object.keys(query).length !== 0 ? parseInt(query.id_booking) : "");
	const [isLoading, setIsLoading] = useState(false);
	// const [bookingDetail, setBookingDetail] = useState(null);
	// const [place, setPlace] = useState([]);
	// const dataUser = useContext(ProfileContext);
	// const [titleImage, setTitleImage] = useState("Edit Profile Image");
	// const [image, setImage] = useState({});
	// const [email, setEmail] = useState("");
	// const [phoneNumber, setPhoneNumber] = useState();
	// const [fullname, setFullname] = useState("");
	// const [idPlace, setIdPlace] = useState();

	// const editBooking = (props) => {

	// const { query } = props;
	// const [Datas, setDatas] = useState([]);
	// const [Update, setUpdate] = useState(Object.keys(query).length !== 0 ? query.status_payment : "");
	// const [IdBooking, setIdBooking] = useState(Object.keys(query).length !== 0 ? parseInt(query.id_booking) : "");
	// const [radioClass, setRadioClass] = useState({ classFlight: "" });
	// const [IdBooking, setIdBooking] = useState("");
	// const [Update, setUpdate] = useState("");
	const [FilterByStatus, setFilterByStatus] = useState("all");
	const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

	// SHOW DETAIL BOOKING ALL BY STATUS FILTER
	if (FilterByStatus == "all") {
		useEffect(() => {
			axios
				.get(`${url}/booking/getall`)
				.then((res) => {
					setDatas(res?.data.booking);
				}, [])
				.catch(() => {
					// console.log(err.response.data);
					setDatas([
						{
							id_booking: null,
							id_ticket: null,
							id_user: null,
							total_passenger: null,
							total_payment: null,
							status_payment: "-",
						},
					]);
				}, []);
		});
	} else {
		useEffect(() => {
			axios
				.get(`${url}/booking/getbystatus?status_payment=${FilterByStatus}`)
				.then(
					(res) => {
						// console.log(res?.data.booking);
						setDatas(res?.data.booking);
					},
					[FilterByStatus]
				)
				.catch(() => {
					// console.log(err.response.data);
					setDatas([
						{
							id_booking: null,
							id_ticket: null,
							id_user: null,
							total_passenger: null,
							total_payment: null,
							status_payment: "-",
						},
					]);
				}, [FilterByStatus]);
		});
	}

	const handleStatusPayment = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (Update == "" && Update != "canceled" && Update != "issue" && Update != "boarding") {
			Swal.fire({
				icon: "error",
				text: `Input "canceled" or "issue" or "boarding" for update status_payment, (id_booking: ${IdBooking})`,
			});
		}

		const bookingDetail = await axios
			.get(`${url}/booking/getbyidbooking?id_booking=${IdBooking}`)
			.then((res) => {
				return res?.data?.booking[0];
			})
			.catch((err) => {
				console.log(err);
			});

		if (Update) {
			// axios
			// 	.patch(
			// 		`${url}/booking/statuspaymentcanceled`,
			// 		{
			// 			id_booking: IdBooking,
			// 		},
			// 		[]
			// 	)
			// 	.then((res) => {
			// 		Swal.fire({
			// 			icon: "success",
			// 			text: res?.data,
			// 		});
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 		Swal.fire({
			// 			icon: "error",
			// 			text: `${err?.response?.data}`,
			// 		});
			// 	})
			// 	.finally(() => {
			// 		setIsLoading(false);
			// 	});
			// } else {
			axios
				.patch(
					`${url}/booking/statuspaymentforadmin`,
					{
						id_booking: IdBooking,
						user_role: "admin",
						status_payment: Update,
					},
					[]
				)
				.then((res) => {
					console.log(bookingDetail);
					if (Update === "issue") {
						const starCountRef = ref(database, `notif/${bookingDetail?.id_user}/${new Date().getTime()}`);
						set(starCountRef, {
							title: "payment sucess",
							notif: `pembayaran berhasil`,
							time: new Date().getTime(),
							user_id: bookingDetail?.id_user,
							status_notif: "sended",
						});
					} else if (Update === "boarding") {
						const starCountRef = ref(database, `notif/${bookingDetail?.id_user}/${new Date().getTime()}`);
						set(starCountRef, {
							title: "ticket has been used",
							notif: `semoga perjalan anda menyenangkan, sampai jumpa kembali`,
							time: new Date().getTime(),
							user_id: bookingDetail?.id_user,
							status_notif: "sended",
						});
					}
					Swal.fire({
						icon: "success",
						text: res?.data,
					});
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						icon: "error",
						text: `${err?.response?.data}`,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<>
			<Navbar />
			<div className="container-fluid mt-5">
				<div className="row">
					<Sidebar>
						<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
							<div className="pt-3 pb-2 mb-5 border-bottom">
								<h1 className="h2">Edit Booking</h1>
							</div>

							{/* MAIN */}
							<div className="row">
								{/* FORM UPDATE */}
								<div className="col-3">
									<div className="card p-3 shadow">
										{/* PETUNJUK */}
										<small className="">*Can change Status payment:</small>
										<small className="">-from `waiting` to `issue` or `canceled`</small>
										<small className="">-from `issue` to `boarding`</small>
										<hr className="mb-2" />
										{/* FORM */}
										<form onSubmit={handleStatusPayment}>
											<div className="my-4">
												<label htmlFor="formGroupExampleInput" className="form-label">
													Input ID Booking
												</label>
												<input
													type="number"
													min={1}
													className="form-control"
													id="formGroupExampleInput"
													value={IdBooking}
													onChange={(e) => setIdBooking(e.target.value)}
												/>
											</div>

											{/* Radio button di Form ganti status payment */}
											<div className="my-4">
												<div>
													<label htmlFor="formGroupExampleInput" className="form-label">
														Choose Status Payment Update to:
													</label>
												</div>
												{statusPayment.map((result, i) => (
													<div key={i} className="form-check form-check-inline">
														<input
															className="form-check-input cursor-pointer"
															type="radio"
															value={result}
															name="radioValues"
															id={`inlineRadio${i}`}
															onClick={(e) => setUpdate(e.target.value)}
														/>
														<label className="form-check-label fs-14 fw-bold cursor-pointer" htmlFor={`inlineRadio${i}`}>
															{result}
														</label>
													</div>
												))}
											</div>

											<button className="btn btn-primary float-end" type="submit" disabled={isLoading}>
												{isLoading ? "Loading..." : "UPDATE"}
											</button>
										</form>
									</div>
								</div>

								{/* PERLIHATKAN STATUS BOOKING */}
								<div className="col-9">
									{/* Radio button untuk filtering berdasarkan status payment */}
									<div className="pb-2">
										<label htmlFor="formGroupExampleInput" className="form-label">
											Filtering Status Payment by:
										</label>

										{/* Hasil show berdasarkan status payment */}
										{allStatusPayment.map((result, i) => (
											<div key={i} className="form-check form-check-inline">
												<input
													className="form-check-input cursor-pointer"
													type="radio"
													value={result}
													name="radioValues"
													id={`inlineRadio${i}`}
													onClick={(e) => setFilterByStatus(e.target.value)}
												/>
												<label className="form-check-label fs-14 fw-bold cursor-pointer" htmlFor={`inlineRadio${i}`}>
													{result}
												</label>
											</div>
										))}
									</div>

									<table className="table table-hover">
										<thead className="table-dark">
											<tr>
												<th>No</th>
												<th>Id Booking</th>
												<th>Id Ticket</th>
												<th>Id User</th>
												<th>Passenger</th>
												<th>Total Payment</th>
												<th>Status Payment</th>
											</tr>
										</thead>
										<tbody>
											{Datas.map((data, index) => (
												<tr key={data.id_booking}>
													<td>{index + 1}</td>
													<td>{data.id_booking}</td>
													<td>{data.id_ticket}</td>
													<td>{data.id_user}</td>
													<td>{data.total_passenger}</td>
													<td>{formatter.format(data.total_payment)}</td>
													<td>
														{/* {data.status_payment} */}
														<BookingStatus status={data.status_payment} />
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</main>
					</Sidebar>
				</div>
			</div>
		</>
	);
};

export default editBooking;

export const getServerSideProps = async ({ req, query }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		if (user.role !== "admin") {
			return {
				redirect: {
					destination: "/register",
					permanent: true,
				},
			};
		}

		return {
			props: { query },
		};
	}
	return {
		redirect: {
			destination: "/register",
			permanent: true,
		},
	};
};
