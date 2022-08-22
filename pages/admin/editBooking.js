/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";
// layouts
import Sidebar from "layouts/admin/Sidebar";
// component
import Navbar from "@components/navbar/admin/Navbar";

import React, { useState, useContext, useEffect } from "react";

import Swal from "sweetalert2";
// import profileStyle from "../styles/profile.module.css";
// import imgPlane from "../public/images/plane.png";

// PERSIAPAN UNTUK ENV DOMAIN
var url = "https://ticket-byte-v1.herokuapp.com";
// var url = 'http://localhost:8000';
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

const editBooking = (props) => {
	const { query } = props;
	const [Datas, setDatas] = useState([]);
	const [Update, setUpdate] = useState("");
	const [IdBooking, setIdBooking] = useState("");
	// const [place, setPlace] = useState([]);
	// const dataUser = useContext(ProfileContext);
	// const [titleImage, setTitleImage] = useState("Edit Profile Image");
	// const [image, setImage] = useState({});
	// const [email, setEmail] = useState("");
	// const [phoneNumber, setPhoneNumber] = useState();
	// const [fullname, setFullname] = useState("");
	// const [idPlace, setIdPlace] = useState();
	const [isLoading, setIsLoading] = useState(false);
	// const router = useRouter();

	useEffect(() => {
		axios
			.get(`${url}/booking/getall`)
			.then((res) => {
				setDatas(res?.data.booking);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setUpdate(Object.keys(query).length !== 0 ? query.status_payment : "");
				setIdBooking(Object.keys(query).length !== 0 ? parseInt(query.id_booking) : "");
			});
	}, [query]);

	const handleStatusPayment = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (Update == "" && Update != "canceled" && Update != "issue" && Update != "boarding") {
			Swal.fire({
				icon: "error",
				text: `Input "canceled" or "issue" or "boarding" for update status_payment, (id_booking: ${IdBooking})`,
			});
		}

		if (Update == "canceled") {
			axios
				.patch(
					`${url}/booking/statuspaymentcanceled`,
					{
						id_booking: IdBooking,
					},
					[]
				)
				.then((res) => {
					Swal.fire({
						icon: "success",
						text: res?.data,
					});
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						icon: "error",
						text: `${err?.response?.data}, (id_booking: ${IdBooking})`,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
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
					Swal.fire({
						icon: "success",
						text: res?.data,
					});
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						icon: "error",
						text: `${err?.response?.data}, (id_booking: ${IdBooking})`,
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
							{/* content */}
							<div className="row">
								<div className="col-4">
									<div className="card p-4 shadow">
										{/* PETUNJUK */}
										<small className="">Can change status_payment:</small>
										<small className="">-from `waiting` to `issue` or `canceled`</small>
										<small className="">-from `issue` to `issue` or `boarding`</small>
										<hr className="mb-2" />
										<form onSubmit={handleStatusPayment}>
											<div className="mb-3">
												<label htmlFor="formGroupExampleInput" className="form-label">
													Input Id Booking
												</label>
												<input
													type="number"
													className="form-control"
													id="formGroupExampleInput"
													value={IdBooking}
													onChange={(e) => setIdBooking(e.target.value)}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="formGroupExampleInput" className="form-label">
													Update Status Payment
												</label>
												<input
													type="text"
													placeholder="canceled / issue / boarding"
													className="form-control"
													id="formGroupExampleInput"
													value={Update}
													onChange={(e) => setUpdate(e.target.value)}
												/>
											</div>

											<button className="mt-3 btn btn-primary float-end" type="submit" disabled={isLoading}>
												{isLoading ? "Loading..." : "UPDATE"}
											</button>
										</form>
									</div>
								</div>
								{/* table */}
								<div className="col-8">
									<table className="table table-hover">
										<thead className="table-dark">
											<tr>
												<th>No</th>
												<th>ID Booking</th>
												<th>ID Ticket</th>
												<th>ID User</th>
												<th>Passenger</th>
												<th>Total Payment</th>
												<th>Status Before</th>
											</tr>
										</thead>
										<tbody>
											{Datas.map((data, index) => (
												<tr key={data.id_booking}>
													<td>{index + 1}</td>
													<td>{data?.id_booking}</td>
													<td>{data.id_ticket}</td>
													<td>{data.id_user}</td>
													<td>{data.total_passenger}</td>
													<td>{data.total_payment}</td>
													<td>{data.status_payment}</td>
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
